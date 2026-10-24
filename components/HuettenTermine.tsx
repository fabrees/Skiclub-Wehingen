import { CalendarDays } from "lucide-react";
import { kommendeOeffentlicheTermine } from "@/lib/buchungen";
import { formatTag, formatZeitraum, Tag } from "@/lib/datum";

const wochentag = (tag: Tag) => formatTag(tag, { weekday: "short", day: undefined, month: undefined, year: undefined });

// Dezente Übersicht der nächsten öffentlichen Termine auf der Hütte.
// Ohne Termine (oder ohne Datenbank) wird nichts angezeigt.
const HuettenTermine = async () => {
  let termine: Awaited<ReturnType<typeof kommendeOeffentlicheTermine>> = [];
  try {
    termine = await kommendeOeffentlicheTermine(5);
  } catch (err) {
    console.error("Hüttentermine: Laden fehlgeschlagen", err);
  }
  if (termine.length === 0) return null;

  return (
    <section aria-labelledby="huettentermine" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <h2 id="huettentermine" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-alb-600">
          <CalendarDays className="h-4 w-4" aria-hidden />
          Termine auf der Hütte
        </h2>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {termine.map((t) => (
            <li key={t.id} className="flex gap-3 text-sm sm:text-base">
              <span className="shrink-0 font-semibold text-alb-900 tabular-nums">
                {t.von === t.bis
                  ? `${wochentag(t.von)}, ${formatZeitraum(t.von, t.bis)}`
                  : formatZeitraum(t.von, t.bis)}
              </span>
              <span className="text-slate-700">{t.titel}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HuettenTermine;
