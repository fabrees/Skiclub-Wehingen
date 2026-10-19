import { naechsterFossiliuslauf } from "@/lib/verein";

// Alle Daten zum Fossiliuslauf an einer Stelle – hier jährlich anpassen

// Genauer Termin, sobald er feststeht, z.B. new Date(2027, 8, 26) für den
// 26.09.2027 (Monat zählt ab 0). Solange null, wird nur "September <Jahr>" angezeigt.
export const FESTER_TERMIN: Date | null = null;

export type Termin = {
  fest: boolean;
  // z.B. "Sonntag, 26. September 2027" bzw. "September 2027"
  lang: string;
  // für das Datums-Badge: z.B. "26.09." bzw. "September"
  kurz: string;
  jahr: number;
};

export function fossiliuslaufTermin(): Termin {
  if (FESTER_TERMIN) {
    return {
      fest: true,
      lang: FESTER_TERMIN.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kurz: FESTER_TERMIN.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
      jahr: FESTER_TERMIN.getFullYear(),
    };
  }

  const jahr = naechsterFossiliuslauf().getFullYear();
  return { fest: false, lang: `September ${jahr}`, kurz: "September", jahr };
}

// Auf true setzen, sobald die Online-Anmeldung für den nächsten Lauf offen ist
// (und ANMELDUNG_URL auf die neue Anmeldeseite zeigt). Solange false, werden
// alle Anmelde-Buttons ausgeblendet und ein Hinweis angezeigt.
export const ANMELDUNG_OFFEN = false;

export const ANMELDUNG_URL =
  "http://www.fossiliuslauf.sc-wehingen.de/anmeldung/anmeldung-2026.html";

export const ERGEBNISSE_URL =
  "https://my.raceresult.com/385773/results#0_8AF0E5";

export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4017924368036!2d8.799015413264739!3d48.137411173294836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a0a1929c634f5%3A0xd2d041efc37a1a32!2sSkiclub%20Wehingen%20e.V.!5e0!3m2!1sde!2sde!4v1728588872095!5m2!1sde!2sde";

export const MAPS_LINK_URL =
  "https://www.google.com/maps/search/?api=1&query=Skiclub+Wehingen+e.V.";

export type Gruppe = "Kinder" | "Jugendliche" | "Erwachsene";

export type Lauf = {
  start: string;
  name: string;
  alter: string;
  strecke: string;
  startgeld: string;
  gruppe: Gruppe;
};

// Zeitplan in Startreihenfolge
export const LAEUFE: Lauf[] = [
  { start: "09:30", name: "Bambinilauf", alter: "2–4 Jahre", strecke: "100 m", startgeld: "kostenlos", gruppe: "Kinder" },
  { start: "09:45", name: "Kidslauf", alter: "5–7 Jahre", strecke: "300 m", startgeld: "kostenlos", gruppe: "Kinder" },
  { start: "10:00", name: "Schülerlauf", alter: "8–11 Jahre", strecke: "1,5 km", startgeld: "4,00 €", gruppe: "Jugendliche" },
  { start: "10:00", name: "Schülerlauf", alter: "12–15 Jahre", strecke: "3,0 km", startgeld: "4,00 €", gruppe: "Jugendliche" },
  { start: "11:00", name: "Hauptlauf", alter: "ab 15 Jahren", strecke: "11,2 km", startgeld: "8,00 €", gruppe: "Erwachsene" },
  { start: "11:10", name: "Jedermannlauf", alter: "ab 15 Jahren", strecke: "6,0 km", startgeld: "6,00 €", gruppe: "Erwachsene" },
  { start: "11:10", name: "Nordic Walking", alter: "ab 15 Jahren", strecke: "8,0 km", startgeld: "6,00 €", gruppe: "Erwachsene" },
];
