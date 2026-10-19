import { ANMELDUNG_OFFEN, ANMELDUNG_URL } from "@/lib/fossiliuslauf";

// Schwebender Anmelde-Button auf der Fossiliuslauf-Seite
export default function HoverButton() {
    if (!ANMELDUNG_OFFEN) return null;

    return (
        <a
            href={ANMELDUNG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-40 rounded-full bg-brand-500 px-5 py-3 font-bold text-white shadow-xl ring-4 ring-white transition hover:bg-brand-600 sm:bottom-8 sm:right-8 sm:px-7 sm:py-4 sm:text-lg"
        >
            <span className="hidden sm:inline">Jetzt </span>anmelden
        </a>
    );
}
