import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import prisma from "@/prisma/lib/client";
import { belegendeBuchungen } from "@/lib/buchungen";
import { dateAusTag, heute, plusTage, tagAusDate } from "@/lib/datum";

export const dynamic = "force-dynamic";

// Kalender-Abo im iCalendar-Format (RFC 5545).
//   /api/kalender/belegung.ics              → nur „Belegt“, öffentlich
//   /api/kalender/belegung.ics?token=…      → mit Text und Kontakt, Token aus KALENDER_ICS_TOKEN

function tokenGueltig(token: string | null) {
  const erwartet = process.env.KALENDER_ICS_TOKEN;
  if (!token || !erwartet) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(erwartet);
  return a.length === b.length && timingSafeEqual(a, b);
}

function text(wert: string) {
  return wert.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

// Zeilen nach 75 Oktetten umbrechen, Fortsetzungszeilen beginnen mit Leerzeichen
function falten(zeile: string) {
  const teile: string[] = [];
  let rest = zeile;
  let grenze = 75;
  while (Buffer.byteLength(rest) > grenze) {
    let i = grenze;
    while (Buffer.byteLength(rest.slice(0, i)) > grenze) i--;
    teile.push(rest.slice(0, i));
    rest = rest.slice(i);
    grenze = 74;
  }
  teile.push(rest);
  return teile.join("\r\n ");
}

const icsDatum = (tag: string) => tag.replace(/-/g, "");
const icsZeit = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export async function GET(req: NextRequest) {
  const details = tokenGueltig(req.nextUrl.searchParams.get("token"));
  const jetzt = new Date();

  // Ein Jahr Rückblick genügt für Kalender-Apps
  const buchungen = await prisma.buchung.findMany({
    where: { AND: [belegendeBuchungen(jetzt), { bis: { gte: dateAusTag(plusTage(heute(), -365)) } }] },
    orderBy: { von: "asc" },
  });

  const zeilen = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Skiclub Wehingen e.V.//Buchungskalender Skihuette//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${details ? "Skihütte – Buchungen" : "Skihütte – Belegung"}`,
    "X-WR-TIMEZONE:Europe/Berlin",
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
  ];

  for (const b of buchungen) {
    const anfrage = b.status === "ANFRAGE";
    const titel = details ? `${anfrage ? "Anfrage: " : ""}${b.titel}` : "Belegt";
    const beschreibung = details
      ? [b.name && `Name: ${b.name}`, b.email && `E-Mail: ${b.email}`, b.nachricht, anfrage && b.geblocktBis
          ? `Vorläufig geblockt bis ${b.geblocktBis.toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`
          : null]
          .filter(Boolean)
          .join("\n")
      : "";

    zeilen.push(
      "BEGIN:VEVENT",
      `UID:buchung-${b.id}@sc-wehingen.de`,
      `DTSTAMP:${icsZeit(jetzt)}`,
      `CREATED:${icsZeit(b.createdAt)}`,
      `DTSTART;VALUE=DATE:${icsDatum(tagAusDate(b.von))}`,
      // Ende ist bei ganztägigen Terminen exklusiv
      `DTEND;VALUE=DATE:${icsDatum(plusTage(tagAusDate(b.bis), 1))}`,
      `SUMMARY:${text(titel)}`,
      ...(beschreibung ? [`DESCRIPTION:${text(beschreibung)}`] : []),
      // Öffentlich nur belegt, ohne Unterscheidung Anfrage/bestätigt
      `STATUS:${details && anfrage ? "TENTATIVE" : "CONFIRMED"}`,
      "TRANSP:OPAQUE",
      "END:VEVENT"
    );
  }
  zeilen.push("END:VCALENDAR");

  return new Response(zeilen.map(falten).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="skihuette-belegung.ics"',
      "Cache-Control": "no-store",
    },
  });
}
