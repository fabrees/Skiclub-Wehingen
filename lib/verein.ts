// Zentrale Vereinsdaten, die an mehreren Stellen der Seite gebraucht werden

export const WHATSAPP_SKILIFT_URL =
  "https://www.whatsapp.com/channel/0029VbC0VefDOQIUZc5qIa2D";

export const LOIPE_URL = "https://skiwanderwege-heuberg.de/";

export const INSTAGRAM_HANDLE = "sc_wehingen";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const VORSTAND_MAIL = "vorstand@sc-wehingen.de";

// PDFs liegen unter public/documents – zum Aktualisieren die Datei dort ersetzen
export const DOKUMENTE = {
  mitgliedsantrag: "/documents/mitgliedsantrag.pdf",
  mietpreise: "/documents/mietpreise-skihuette.pdf",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Startseite" },
  { href: "/fossiliuslauf", label: "Fossiliuslauf" },
  { href: "/mtb-trail", label: "MTB-Trail" },
  { href: "/mieten", label: "Skihütte" },
  { href: "/newsletter", label: "Neuigkeiten" },
  { href: "/verein", label: "Verein" },
];

// Der Fossiliuslauf findet jedes Jahr am letzten Sonntag im September statt
export function naechsterFossiliuslauf(heute: Date = new Date()): Date {
  const letzterSeptembersonntag = (jahr: number) => {
    const d = new Date(jahr, 8, 30);
    d.setDate(30 - d.getDay());
    return d;
  };

  const start = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
  const diesesJahr = letzterSeptembersonntag(heute.getFullYear());
  return diesesJahr >= start
    ? diesesJahr
    : letzterSeptembersonntag(heute.getFullYear() + 1);
}
