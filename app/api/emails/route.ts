import { RentingInfo } from "@/components/emails/RentingInfo";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const anfrageSchema = z.object({
    firstName: z.string().trim().min(2, "Bitte geben Sie einen gültigen Vornamen an").max(100),
    lastName: z.string().trim().min(2, "Bitte geben Sie einen gültigen Nachnamen an").max(100),
    email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail an").max(200),
    message: z.string().trim().min(5, "Bitte geben Sie eine Nachricht ein (min. 5 Zeichen)").max(5000),
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

    const { firstName, lastName, email, message, website } = parsed.data;

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

    try {
        const html = await render(RentingInfo(firstName, lastName, email, message));
        const text = `Neue Mietanfrage von der Skiclub-Website\n\nVorname: ${firstName}\nNachname: ${lastName}\nE-Mail: ${email}\n\nNachricht:\n${message}\n`;

        await nodemailer.createTransport(konfig.transport).sendMail({
            from: konfig.from,
            to: konfig.to,
            replyTo: { name: `${firstName} ${lastName}`, address: email },
            subject: `Mietanfrage Skihütte: ${firstName} ${lastName}`.replace(/[\r\n]+/g, " "),
            html,
            text,
        });
    } catch (err) {
        console.error("Mietanfrage: Versand fehlgeschlagen", err);
        return NextResponse.json(
            { error: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut." },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true });
}
