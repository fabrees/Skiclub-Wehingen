import { Buchung, BuchungStatus, Prisma } from "@prisma/client";
import prisma from "@/prisma/lib/client";
import { dateAusTag, heute, plusTage, Tag, tagAusDate, tageImZeitraum } from "@/lib/datum";

export const EINSTELLUNG_STANDARD = {
  // Wie viele Tage im Voraus über die Website angefragt werden kann
  buchungshorizontTage: 365,
  // Wie lange eine Anfrage den Zeitraum blockiert
  anfrageSperreStunden: 24,
};

export type Einstellungen = typeof EINSTELLUNG_STANDARD;
export type EinstellungSchluessel = keyof Einstellungen;

export const EINSTELLUNG_GRENZEN: Record<EinstellungSchluessel, { min: number; max: number }> = {
  buchungshorizontTage: { min: 1, max: 1095 },
  anfrageSperreStunden: { min: 1, max: 720 },
};

export async function ladeEinstellungen(): Promise<Einstellungen> {
  const zeilen = await prisma.einstellung.findMany();
  const ergebnis = { ...EINSTELLUNG_STANDARD };
  for (const { schluessel, wert } of zeilen) {
    if (schluessel in ergebnis) {
      const zahl = Number(wert);
      if (Number.isFinite(zahl)) ergebnis[schluessel as EinstellungSchluessel] = zahl;
    }
  }
  return ergebnis;
}

export async function speichereEinstellungen(werte: Partial<Einstellungen>) {
  await prisma.$transaction(
    Object.entries(werte).map(([schluessel, wert]) =>
      prisma.einstellung.upsert({
        where: { schluessel },
        create: { schluessel, wert: String(wert) },
        update: { wert: String(wert) },
      })
    )
  );
}

// Status, die einen Zeitraum dauerhaft belegen
export const DAUERHAFT_BELEGEND: BuchungStatus[] = ["BESTAETIGT", "OEFFENTLICH"];

// Buchungen, die einen Zeitraum aktuell belegen: bestätigte und öffentliche
// sowie Anfragen, deren Sperrfrist noch läuft. Abgelaufene Anfragen bleiben
// gespeichert, geben den Zeitraum aber wieder frei.
export function belegendeBuchungen(jetzt = new Date()): Prisma.BuchungWhereInput {
  return {
    OR: [{ status: { in: DAUERHAFT_BELEGEND } }, { status: "ANFRAGE", geblocktBis: { gt: jetzt } }],
  };
}

export function ueberschneidung(von: Tag, bis: Tag): Prisma.BuchungWhereInput {
  return { von: { lte: dateAusTag(bis) }, bis: { gte: dateAusTag(von) } };
}

export function istBelegend(b: Pick<Buchung, "status" | "geblocktBis">, jetzt = new Date()) {
  return DAUERHAFT_BELEGEND.includes(b.status) || (b.geblocktBis !== null && b.geblocktBis > jetzt);
}

// Belegte Tage im buchbaren Zeitraum, ohne Details zu den Buchungen
export async function belegteTage(von: Tag, bis: Tag): Promise<Tag[]> {
  const buchungen = await prisma.buchung.findMany({
    where: { AND: [belegendeBuchungen(), ueberschneidung(von, bis)] },
    select: { von: true, bis: true },
  });
  const tage = new Set<Tag>();
  for (const b of buchungen) {
    const start = tagAusDate(b.von) < von ? von : tagAusDate(b.von);
    const ende = tagAusDate(b.bis) > bis ? bis : tagAusDate(b.bis);
    for (const t of tageImZeitraum(start, ende)) tage.add(t);
  }
  return Array.from(tage).sort();
}

// Öffentliche Termine im Zeitraum, nur mit Text – für die Website
export async function oeffentlicheTermine(von: Tag, bis: Tag) {
  const termine = await prisma.buchung.findMany({
    where: { AND: [{ status: "OEFFENTLICH" }, ueberschneidung(von, bis)] },
    select: { von: true, bis: true, titel: true },
    orderBy: { von: "asc" },
  });
  return termine.map((t) => ({ von: tagAusDate(t.von), bis: tagAusDate(t.bis), titel: t.titel }));
}

// Erster und letzter Tag, der über die Website angefragt werden kann
export function buchbarerZeitraum(einstellungen: Einstellungen) {
  const ersterTag = heute();
  return { ersterTag, letzterTag: plusTage(ersterTag, einstellungen.buchungshorizontTage - 1) };
}

export function buchungAlsJson(b: Buchung) {
  return {
    ...b,
    von: tagAusDate(b.von),
    bis: tagAusDate(b.bis),
    belegt: istBelegend(b),
  };
}

export type BuchungJson = ReturnType<typeof buchungAlsJson>;
