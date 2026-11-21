"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  dateAusTag,
  formatTag,
  formatZeitraum,
  monatsAnfang,
  monatsName,
  monatsRaster,
  naechsterMonat,
  Tag,
  tageImZeitraum,
  WOCHENTAGE,
} from "@/lib/datum";

export type Zeitraum = { von: Tag; bis: Tag } | null;

type Termin = { von: Tag; bis: Tag; titel: string };
type Verfuegbarkeit = {
  ersterTag: Tag;
  letzterTag: Tag;
  belegt: Tag[];
  // Öffentliche Vereinstermine, deren Text angezeigt wird (belegen ebenfalls)
  termine: Termin[];
  sperreStunden: number;
};

const ersterDesMonats = (tag: Tag) => {
  const d = dateAusTag(tag);
  return monatsAnfang(d.getUTCFullYear(), d.getUTCMonth());
};

// Lädt die Belegung der Skihütte (frei/belegt und öffentliche Termine)
export function useVerfuegbarkeit() {
  const [daten, setDaten] = useState<Verfuegbarkeit | null>(null);
  const [fehler, setFehler] = useState(false);

  const laden = async () => {
    setFehler(false);
    try {
      const res = await fetch("/api/buchungen/verfuegbarkeit", { cache: "no-store" });
      if (!res.ok) throw new Error();
      setDaten(await res.json());
    } catch {
      setFehler(true);
    }
  };

  useEffect(() => {
    laden();
  }, []);

  return { daten, fehler, laden };
}

// Monatskalender zur Auswahl eines Zeitraums. Belegte Tage und Tage außerhalb
// des buchbaren Zeitraums sind nicht wählbar; ein Zeitraum darf keinen
// belegten Tag einschließen.
const BelegungsKalender = ({
  verfuegbarkeit,
  wert,
  onChange,
  hatFehler,
}: {
  verfuegbarkeit: Verfuegbarkeit;
  wert: Zeitraum;
  onChange: (z: Zeitraum) => void;
  hatFehler?: boolean;
}) => {
  const { ersterTag, letzterTag } = verfuegbarkeit;
  const belegt = useMemo(() => new Set(verfuegbarkeit.belegt), [verfuegbarkeit.belegt]);
  const terminAmTag = useMemo(() => {
    const karte = new Map<Tag, string>();
    for (const t of verfuegbarkeit.termine) for (const tag of tageImZeitraum(t.von, t.bis)) karte.set(tag, t.titel);
    return karte;
  }, [verfuegbarkeit.termine]);

  const ersterMonat = ersterDesMonats(ersterTag);
  const letzterMonat = ersterDesMonats(letzterTag);
  const [monat, setMonat] = useState(() => (wert ? ersterDesMonats(wert.von) : ersterMonat));
  // Nach Klick auf den Anfangstag wartet der Kalender auf den Endtag
  const [wartetAufEnde, setWartetAufEnde] = useState(false);
  const [hover, setHover] = useState<Tag | null>(null);

  const waehlbar = (tag: Tag) => tag >= ersterTag && tag <= letzterTag && !belegt.has(tag);
  const zeitraumFrei = (von: Tag, bis: Tag) => tageImZeitraum(von, bis).every(waehlbar);

  const klick = (tag: Tag) => {
    if (!waehlbar(tag)) return;
    if (wartetAufEnde && wert && tag >= wert.von && zeitraumFrei(wert.von, tag)) {
      onChange({ von: wert.von, bis: tag });
      setWartetAufEnde(false);
    } else {
      onChange({ von: tag, bis: tag });
      setWartetAufEnde(true);
    }
  };

  // Vorschau beim Überfahren mit der Maus, solange der Endtag fehlt
  const vorschau =
    wartetAufEnde && wert && hover && hover > wert.von && zeitraumFrei(wert.von, hover)
      ? { von: wert.von, bis: hover }
      : wert;

  // Auf großen Bildschirmen zwei Monate nebeneinander
  const monate = [monat, naechsterMonat(monat)];
  const nachDenMonaten = naechsterMonat(monat, 2);
  const termineImBlick = verfuegbarkeit.termine.filter((t) => t.von < nachDenMonaten && t.bis >= monat);

  return (
    <div>
      <div
        className={`relative rounded-2xl border bg-white p-4 sm:p-5 ${hatFehler ? "border-red-500" : "border-slate-300"}`}
        onMouseLeave={() => setHover(null)}
      >
        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between sm:inset-x-4 sm:top-4">
          <button
            type="button"
            onClick={() => setMonat(naechsterMonat(monat, -1))}
            disabled={monat <= ersterMonat}
            className="pointer-events-auto rounded-full p-2 text-alb-800 transition hover:bg-alb-50 disabled:opacity-30"
            aria-label="Vorheriger Monat"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMonat(naechsterMonat(monat))}
            disabled={monat >= letzterMonat}
            className="pointer-events-auto rounded-full p-2 text-alb-800 transition hover:bg-alb-50 disabled:opacity-30"
            aria-label="Nächster Monat"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {monate.map((m, i) => (
            <div key={m} className={i === 1 ? "hidden sm:block" : ""}>
              <p className="mb-4 flex h-9 items-center justify-center font-bold text-alb-900">
                {m <= letzterMonat ? monatsName(m) : ""}
              </p>
              {m <= letzterMonat && (
                <div className="grid grid-cols-7 gap-1 text-center">
                  {WOCHENTAGE.map((w) => (
                    <div key={w} className="pb-1 text-xs font-semibold text-slate-500">
                      {w}
                    </div>
                  ))}
                  {monatsRaster(m).map((tag, j) => {
                    if (!tag) return <div key={`leer-${j}`} />;
                    const istBelegt = belegt.has(tag);
                    const termin = terminAmTag.get(tag);
                    const ausserhalb = tag < ersterTag || tag > letzterTag;
                    const imZeitraum = vorschau && tag >= vorschau.von && tag <= vorschau.bis;
                    const istRand = vorschau && (tag === vorschau.von || tag === vorschau.bis);

                    let klasse = "text-alb-900 hover:bg-brand-50 bg-tanne-50";
                    if (ausserhalb) klasse = "text-slate-300 cursor-not-allowed";
                    else if (termin) klasse = "bg-alb-800 text-white cursor-not-allowed";
                    else if (istBelegt)
                      klasse = "bg-slate-200 text-slate-400 line-through cursor-not-allowed";
                    if (imZeitraum) klasse = "bg-brand-100 text-brand-700";
                    if (istRand) klasse = "bg-brand-500 text-white font-bold";

                    return (
                      <button
                        key={tag}
                        type="button"
                        disabled={ausserhalb || istBelegt || !!termin}
                        onClick={() => klick(tag)}
                        onMouseEnter={() => setHover(tag)}
                        aria-label={`${formatTag(tag, { weekday: "long", month: "long" })}${
                          termin ? `, belegt: ${termin}` : istBelegt ? ", belegt" : ausserhalb ? ", nicht buchbar" : ", frei"
                        }`}
                        title={termin}
                        aria-pressed={!!imZeitraum}
                        className={`aspect-square rounded-lg text-sm transition sm:text-base ${klasse}`}
                      >
                        {Number(tag.slice(8))}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-tanne-50 ring-1 ring-slate-200" /> frei
          </span>
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-slate-200" /> belegt
          </span>
          {verfuegbarkeit.termine.length > 0 && (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded bg-alb-800" /> Vereinstermin
            </span>
          )}
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-brand-500" /> Ihre Auswahl
          </span>
        </div>

        {termineImBlick.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {termineImBlick.map((t) => (
              <li
                key={`${t.von}-${t.titel}`}
                // Auf dem Handy ist nur der erste Monat sichtbar
                className={`gap-2 ${t.von < naechsterMonat(monat) ? "flex" : "hidden sm:flex"}`}
              >
                <span className="mt-1 h-3 w-3 shrink-0 rounded bg-alb-800" aria-hidden />
                <span>
                  <span className="font-semibold text-alb-900">{formatZeitraum(t.von, t.bis)}</span> · {t.titel}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-600" aria-live="polite">
        {!wert
          ? "Bitte wählen Sie den ersten Tag."
          : wartetAufEnde
            ? `Ab ${formatTag(wert.von)} – jetzt den letzten Tag wählen (oder nur diesen einen Tag).`
            : `Gewählt: ${formatZeitraum(wert.von, wert.bis)}`}
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Buchbar bis {formatTag(letzterTag)}. Nach dem Absenden ist der Zeitraum{" "}
        {verfuegbarkeit.sperreStunden} Stunden für Sie vorgemerkt – in dieser Zeit meldet sich der Hüttenwart bei Ihnen.
      </p>
    </div>
  );
};

export default BelegungsKalender;
