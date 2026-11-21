import { RentingInfo } from "@/components/emails/RentingInfo";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/lib/client";
import {
    belegendeBuchungen,
    buchbarerZeitraum,
    ladeEinstellungen,
    ueberschneidung,
} from "@/lib/buchungen";
import { dateAusTag, formatZeitraum, istGueltigerTag } from "@/lib/datum";

export const runtime = "nodejs";

const anfrageSchema = z.object({
    firstName: z.string().trim().min(2, "Bitte geben Sie einen gültigen Vornamen an").max(100),
    lastName: z.string().trim().min(2, "Bitte geben Sie einen gültigen Nachnamen an").max(100),
    email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail an").max(200),
    message: z.string().trim().min(5, "Bitte geben Sie eine Nachricht ein (min. 5 Zeichen)").max(5000),
    von: z.string().refine(istGueltigerTag, "Bitte wählen Sie einen Zeitraum"),
    bis: z.string().refine(istGueltigerTag, "Bitte wählen Sie einen Zeitraum"),
    // Honeypot: für Menschen unsichtbar, Bots füllen es aus
    website: z.string().optional(),
});

// Einfache Begrenzung pro IP (im Speicher des Prozesses)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const anfragenProIp = new Map<string, number[]>();

function zuVieleAnfragen(ip: string) {
    const jetzt = Date.now();
    const zeiten = (anfragenProIp.get(ip) ?? []).filter((t) => jetzt - t < RATE_WINDOW_MS);
    zeiten.push(jetzt);
    anfragenProIp.set(ip, zeiten);
    return zeiten.length > RATE_LIMIT;
}

function smtpKonfiguration() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MIETANFRAGE_FROM, MIETANFRAGE_TO } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MIETANFRAGE_FROM || !MIETANFRAGE_TO) return null;

    const port = Number(SMTP_PORT ?? 465);
    return {
        transport: {
            host: SMTP_HOST,
            port,
            // Port 465: direkt TLS, sonst STARTTLS
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        },
        from: MIETANFRAGE_FROM,
        to: MIETANFRAGE_TO.split(",").map((a) => a.trim()).filter(Boolean),
    };
}

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const parsed = anfrageSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Bitte prüfen Sie Ihre Eingaben.", fields: parsed.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    const { firstName, lastName, email, message, website, von, bis } = parsed.data;

    // Bot erkannt: so tun, als wäre alles gut gegangen
    if (website) return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unbekannt";
    if (zuVieleAnfragen(ip)) {
        return NextResponse.json(
            { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
            { status: 429 }
        );
    }

    const konfig = smtpKonfiguration();
    if (!konfig) {
        console.error("Mietanfrage: SMTP_* bzw. MIETANFRAGE_* Umgebungsvariablen fehlen");
        return NextResponse.json(
            { error: "Der Versand ist derzeit nicht möglich. Bitte versuchen Sie es später erneut." },
            { status: 503 }
        );
    }

    // Zeitraum prüfen und für die Sperrfrist blocken. Erst eintragen, dann
    // senden – schlägt der Versand fehl, wird der Eintrag wieder entfernt.
    let buchungId: number;
    try {
        const einstellungen = await ladeEinstellungen();
        const { ersterTag, letzterTag } = buchbarerZeitraum(einstellungen);
        if (von > bis || von < ersterTag || bis > letzterTag) {
            return NextResponse.json(
                { error: `Bitte wählen Sie einen Zeitraum innerhalb der nächsten ${einstellungen.buchungshorizontTage} Tage.` },
                { status: 400 }
            );
        }

        const ergebnis = await prisma.$transaction(
            async (tx) => {
                const konflikt = await tx.buchung.findFirst({
                    where: { AND: [belegendeBuchungen(), ueberschneidung(von, bis)] },
                    select: { id: true },
                });
                if (konflikt) return null;
                return tx.buchung.create({
                    data: {
                        von: dateAusTag(von),
                        bis: dateAusTag(bis),
                        status: "ANFRAGE",
                        titel: `${firstName} ${lastName}`,
                        name: `${firstName} ${lastName}`,
                        email,
                        nachricht: message,
                        geblocktBis: new Date(Date.now() + einstellungen.anfrageSperreStunden * 3600 * 1000),
                    },
                });
            },
            { isolationLevel: "Serializable" }
        );

        if (!ergebnis) {
            return NextResponse.json(
                { error: "Der gewählte Zeitraum ist leider bereits belegt. Bitte wählen Sie einen anderen." },
                { status: 409 }
            );
        }
        buchungId = ergebnis.id;
    } catch (err) {
        console.error("Mietanfrage: Eintrag in den Kalender fehlgeschlagen", err);
        return NextResponse.json(
            { error: "Die Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut." },
            { status: 500 }
        );
    }

    const zeitraum = formatZeitraum(von, bis);
    try {
        const html = await render(RentingInfo(firstName, lastName, email, message, zeitraum));
        const text = `Neue Mietanfrage von der Skiclub-Website\n\nZeitraum: ${zeitraum}\nVorname: ${firstName}\nNachname: ${lastName}\nE-Mail: ${email}\n\nNachricht:\n${message}\n`;

        await nodemailer.createTransport(konfig.transport).sendMail({
            from: konfig.from,
            to: konfig.to,
            replyTo: { name: `${firstName} ${lastName}`, address: email },
            subject: `Mietanfrage Skihütte ${zeitraum}: ${firstName} ${lastName}`.replace(/[\r\n]+/g, " "),
            html,
            text,
        });
    } catch (err) {
        console.error("Mietanfrage: Versand fehlgeschlagen", err);
        await prisma.buchung.delete({ where: { id: buchungId } }).catch(() => undefined);
        return NextResponse.json(
            { error: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut." },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
