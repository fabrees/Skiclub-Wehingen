// Datums-Hilfen für den Buchungskalender. Tage werden durchgehend als
// "YYYY-MM-DD" behandelt, damit keine Zeitzonen-Verschiebungen entstehen.
// Diese Datei wird von Server und Browser genutzt.

export type Tag = string; // "YYYY-MM-DD"

export const TAG_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function istGueltigerTag(tag: string): boolean {
  if (!TAG_REGEX.test(tag)) return false;
  return tagAusDate(dateAusTag(tag)) === tag;
}

// Interne Darstellung: Mitternacht UTC des Tages
export function dateAusTag(tag: Tag): Date {
  return new Date(`${tag}T00:00:00Z`);
}

export function tagAusDate(d: Date): Tag {
  return d.toISOString().slice(0, 10);
}

export function plusTage(tag: Tag, anzahl: number): Tag {
  const d = dateAusTag(tag);
  d.setUTCDate(d.getUTCDate() + anzahl);
  return tagAusDate(d);
}

// Heutiger Tag in deutscher Zeit
export function heute(): Tag {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Alle Tage von "von" bis "bis" (beide inklusive)
export function tageImZeitraum(von: Tag, bis: Tag): Tag[] {
  const tage: Tag[] = [];
  for (let t = von; t <= bis; t = plusTage(t, 1)) tage.push(t);
  return tage;
}

export function formatTag(tag: Tag, optionen?: Intl.DateTimeFormatOptions): string {
  return dateAusTag(tag).toLocaleDateString("de-DE", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...optionen,
  });
}

export function formatZeitraum(von: Tag, bis: Tag): string {
  return von === bis ? formatTag(von) : `${formatTag(von)} – ${formatTag(bis)}`;
}

export const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// Erster Tag eines Monats, Monat ist 0-basiert und darf überlaufen
export function monatsAnfang(jahr: number, monat: number): Tag {
  return tagAusDate(new Date(Date.UTC(jahr, monat, 1)));
}

// Tage eines Monats als Raster ab Montag; Lücken davor/danach sind null
export function monatsRaster(monatsErster: Tag): (Tag | null)[] {
  const d = dateAusTag(monatsErster);
  const versatz = (d.getUTCDay() + 6) % 7;
  const tageImMonat = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  const zellen: (Tag | null)[] = Array(versatz).fill(null);
  for (let i = 0; i < tageImMonat; i++) zellen.push(plusTage(monatsErster, i));
  while (zellen.length % 7) zellen.push(null);
  return zellen;
}

export function monatsName(monatsErster: Tag): string {
  return formatTag(monatsErster, { day: undefined, month: "long", year: "numeric" });
}

export function naechsterMonat(monatsErster: Tag, anzahl = 1): Tag {
  const d = dateAusTag(monatsErster);
  return monatsAnfang(d.getUTCFullYear(), d.getUTCMonth() + anzahl);
}
