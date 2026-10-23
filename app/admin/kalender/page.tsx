"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import type { BuchungJson } from "@/lib/buchungen";
import {
  dateAusTag,
  formatZeitraum,
  heute,
  monatsAnfang,
  monatsName,
  monatsRaster,
  naechsterMonat,
  Tag,
  WOCHENTAGE,
} from "@/lib/datum";

// Über JSON kommen Datumswerte als Text an
type Buchung = Omit<BuchungJson, "geblocktBis" | "createdAt"> & { geblocktBis: string | null; createdAt: string };

type Entwurf = {
  id?: number;
  von: Tag;
  bis: Tag;
  titel: string;
  status: "ANFRAGE" | "BESTAETIGT";
  name: string;
  email: string;
  nachricht: string;
};

type Einstellungen = {
  buchungshorizontTage: number;
  anfrageSperreStunden: number;
  icsToken: string | null;
};

const leererEntwurf = (tag: Tag): Entwurf => ({
  von: tag,
  bis: tag,
  titel: "",
  status: "BESTAETIGT",
  name: "",
  email: "",
  nachricht: "",
});

const alsEntwurf = (b: Buchung): Entwurf => ({
  id: b.id,
  von: b.von,
  bis: b.bis,
  titel: b.titel,
  status: b.status,
  name: b.name ?? "",
  email: b.email ?? "",
  nachricht: b.nachricht ?? "",
});

const formatZeit = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" });

// Farbe je nach Zustand: bestätigt, offene Anfrage, abgelaufene Anfrage
const chipKlasse = (b: Buchung) =>
  b.status === "BESTAETIGT"
    ? "bg-brand-500 text-white"
    : b.belegt
      ? "bg-brand-100 text-brand-700 ring-1 ring-dashed ring-brand-500"
      : "bg-slate-100 text-slate-400 line-through";

const feldKlasse =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

const BuchungsKalenderAdmin = () => {
  const [buchungen, setBuchungen] = useState<Buchung[]>([]);
  const [monat, setMonat] = useState(() => {
    const d = dateAusTag(heute());
    return monatsAnfang(d.getUTCFullYear(), d.getUTCMonth());
  });
  const [entwurf, setEntwurf] = useState<Entwurf | null>(null);
  const [meldung, setMeldung] = useState<{ text: string; fehler?: boolean } | null>(null);
  const [einstellungen, setEinstellungen] = useState<Einstellungen | null>(null);
  const [origin, setOrigin] = useState("");

  const laden = useCallback(async () => {
    const res = await fetch("/api/admin/buchungen", { cache: "no-store" });
    if (res.ok) setBuchungen(await res.json());
    else setMeldung({ text: "Buchungen konnten nicht geladen werden.", fehler: true });
  }, []);

  useEffect(() => {
    laden();
    fetch("/api/admin/einstellungen", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setEinstellungen);
    setOrigin(window.location.origin);
  }, [laden]);

  const buchungenAmTag = useMemo(() => {
    const karte = new Map<Tag, Buchung[]>();
    for (const tag of monatsRaster(monat)) {
      if (!tag) continue;
      karte.set(
        tag,
        buchungen.filter((b) => b.von <= tag && b.bis >= tag)
      );
    }
    return karte;
  }, [buchungen, monat]);

  const offeneAnfragen = buchungen.filter((b) => b.status === "ANFRAGE" && b.belegt);
  const kommende = buchungen.filter((b) => b.status === "BESTAETIGT" && b.bis >= heute());

  const anfrage = async (url: string, method: string, body?: unknown, erfolg?: string) => {
    setMeldung(null);
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const daten = await res.json().catch(() => null);
    if (!res.ok) {
      setMeldung({ text: daten?.error ?? "Speichern fehlgeschlagen.", fehler: true });
      return null;
    }
    if (erfolg) setMeldung({ text: erfolg });
    await laden();
    return daten;
  };

  const speichern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entwurf) return;
    const { id, ...felder } = entwurf;
    const daten = {
      ...felder,
      name: felder.name || null,
      email: felder.email || null,
      nachricht: felder.nachricht || null,
    };
    const ok = id
      ? await anfrage(`/api/admin/buchungen/${id}`, "PATCH", daten, "Buchung gespeichert.")
      : await anfrage("/api/admin/buchungen", "POST", daten, "Buchung eingetragen.");
    if (ok) setEntwurf(null);
  };

  const loeschen = async (id: number) => {
    if (!confirm("Diese Buchung wirklich löschen?")) return;
    if (await anfrage(`/api/admin/buchungen/${id}`, "DELETE", undefined, "Buchung gelöscht.")) setEntwurf(null);
  };

  const bestaetigen = (id: number) =>
    anfrage(`/api/admin/buchungen/${id}`, "PATCH", { status: "BESTAETIGT" }, "Anfrage bestätigt.").then(
      (ok) => ok && setEntwurf(null)
    );

  const verlaengern = (id: number) =>
    anfrage(`/api/admin/buchungen/${id}`, "PATCH", { sperreVerlaengern: true }, "Sperre verlängert.");

  const einstellungenSpeichern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!einstellungen) return;
    const daten = await anfrage(
      "/api/admin/einstellungen",
      "PUT",
      {
        buchungshorizontTage: einstellungen.buchungshorizontTage,
        anfrageSperreStunden: einstellungen.anfrageSperreStunden,
      },
      "Einstellungen gespeichert."
    );
    if (daten) setEinstellungen({ ...einstellungen, ...daten });
  };

  const icsOeffentlich = `${origin}/api/kalender/belegung.ics`;
  const icsIntern = einstellungen?.icsToken
    ? `${icsOeffentlich}?token=${encodeURIComponent(einstellungen.icsToken)}`
    : null;

  const ausgewaehlt = entwurf?.id ? buchungen.find((b) => b.id === entwurf.id) : undefined;

  // Buchungen, die den angezeigten Monat berühren (Liste für schmale Bildschirme)
  const monatsEnde = naechsterMonat(monat);
  const buchungenImMonat = buchungen.filter((b) => b.von < monatsEnde && b.bis >= monat);

  // Liegt das Formular unter dem Kalender, dorthin scrollen
  const formRef = useRef<HTMLFormElement>(null);
  const bearbeiten = (e: Entwurf) => {
    setEntwurf(e);
    requestAnimationFrame(() => {
      if (window.innerWidth < 1536) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="mb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Buchungskalender Skihütte</h1>
        <p className="mb-6 mt-3 sm:mb-8">
          Tag anklicken, um eine Buchung einzutragen. Eine Buchung anklicken, um sie zu bearbeiten.
        </p>

        {meldung && (
          <p
            role="status"
            className={`mb-6 rounded-xl p-4 ${meldung.fehler ? "bg-red-50 text-red-700" : "bg-tanne-50 text-alb-900"}`}
          >
            {meldung.text}
          </p>
        )}

        <div className="grid gap-6 sm:gap-8 2xl:grid-cols-[1fr_22rem]">
          {/* MONATSANSICHT */}
          <section className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-slate-200 sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMonat(naechsterMonat(monat, -1))}
                className="rounded-full p-2 hover:bg-alb-50"
                aria-label="Vorheriger Monat"
              >
                <ChevronLeft />
              </button>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-alb-900 sm:text-xl">{monatsName(monat)}</h2>
                <button
                  type="button"
                  onClick={() => {
                    const d = dateAusTag(heute());
                    setMonat(monatsAnfang(d.getUTCFullYear(), d.getUTCMonth()));
                  }}
                  className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-alb-50"
                >
                  Heute
                </button>
              </div>
              <button
                type="button"
                onClick={() => setMonat(naechsterMonat(monat))}
                className="rounded-full p-2 hover:bg-alb-50"
                aria-label="Nächster Monat"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-slate-200 text-sm">
              {WOCHENTAGE.map((w) => (
                <div key={w} className="bg-alb-50 py-2 text-center font-semibold text-slate-600">
                  {w}
                </div>
              ))}
              {monatsRaster(monat).map((tag, i) =>
                tag ? (
                  <div
                    key={tag}
                    role="button"
                    tabIndex={0}
                    onClick={() => bearbeiten(leererEntwurf(tag))}
                    onKeyDown={(e) => e.key === "Enter" && bearbeiten(leererEntwurf(tag))}
                    className={`min-h-14 cursor-pointer bg-white p-0.5 text-left hover:bg-brand-50 sm:min-h-24 sm:p-1 ${
                      tag < heute() ? "bg-slate-50 text-slate-400" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        tag === heute() ? "bg-alb-900 font-bold text-white" : ""
                      }`}
                    >
                      {Number(tag.slice(8))}
                    </span>
                    <div className="mt-0.5 space-y-0.5 sm:mt-1 sm:space-y-1">
                      {buchungenAmTag.get(tag)?.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            bearbeiten(alsEntwurf(b));
                          }}
                          title={`${b.titel} (${formatZeitraum(b.von, b.bis)})`}
                          aria-label={`${b.titel} (${formatZeitraum(b.von, b.bis)})`}
                          className={`block h-2 w-full truncate rounded text-left text-xs font-semibold sm:h-auto sm:px-1.5 sm:py-0.5 ${chipKlasse(
                            b
                          )} ${entwurf?.id === b.id ? "outline outline-2 outline-alb-900" : ""}`}
                        >
                          {/* Auf dem Handy nur ein Farbbalken, Text steht in der Liste darunter */}
                          <span className="hidden sm:inline">{b.titel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key={`leer-${i}`} className="bg-slate-50" />
                )
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-2 text-sm text-slate-600 sm:px-0">
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded bg-brand-500" /> bestätigt
              </span>
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded bg-brand-100 ring-1 ring-brand-500" /> Anfrage (geblockt)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded bg-slate-100" /> Anfrage abgelaufen (wieder frei)
              </span>
            </div>

            <ul className="mt-4 space-y-2 border-t border-slate-100 px-2 pb-2 pt-4 sm:hidden">
              {buchungenImMonat.length === 0 && (
                <li className="text-sm text-slate-500">Keine Buchungen in diesem Monat.</li>
              )}
              {buchungenImMonat.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => bearbeiten(alsEntwurf(b))}
                    className="flex w-full items-start gap-3 rounded-lg p-2 text-left text-sm hover:bg-alb-50"
                  >
                    <span className={`mt-1 h-3 w-3 shrink-0 rounded ${chipKlasse(b)}`} />
                    <span>
                      <span className="block font-semibold text-alb-900">{b.titel}</span>
                      <span className="block text-slate-500">{formatZeitraum(b.von, b.bis)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* SEITENLEISTE */}
          <aside className="grid content-start gap-6 lg:grid-cols-2 2xl:grid-cols-1">
            {entwurf && (
              <form
                ref={formRef}
                onSubmit={speichern}
                className="scroll-mt-40 space-y-3 rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200 lg:scroll-mt-28"
              >
                <h2 className="text-lg font-bold text-alb-900">
                  {entwurf.id ? "Buchung bearbeiten" : "Neue Buchung"}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-semibold">
                    Von
                    <input
                      type="date"
                      required
                      value={entwurf.von}
                      onChange={(e) =>
                        setEntwurf({
                          ...entwurf,
                          von: e.target.value,
                          bis: e.target.value > entwurf.bis ? e.target.value : entwurf.bis,
                        })
                      }
                      className={feldKlasse}
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Bis
                    <input
                      type="date"
                      required
                      min={entwurf.von}
                      value={entwurf.bis}
                      onChange={(e) => setEntwurf({ ...entwurf, bis: e.target.value })}
                      className={feldKlasse}
                    />
                  </label>
                </div>
                <label className="block text-sm font-semibold">
                  Text im Kalender
                  <input
                    required
                    maxLength={200}
                    value={entwurf.titel}
                    onChange={(e) => setEntwurf({ ...entwurf, titel: e.target.value })}
                    placeholder="z. B. Geburtstag Familie Müller"
                    className={feldKlasse}
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Status
                  <select
                    value={entwurf.status}
                    onChange={(e) => setEntwurf({ ...entwurf, status: e.target.value as Entwurf["status"] })}
                    className={feldKlasse}
                  >
                    <option value="BESTAETIGT">Bestätigt</option>
                    <option value="ANFRAGE">Anfrage (vorläufig geblockt)</option>
                  </select>
                </label>
                {ausgewaehlt?.status === "ANFRAGE" && ausgewaehlt.geblocktBis && (
                  <p className={`text-sm ${ausgewaehlt.belegt ? "text-brand-700" : "text-red-600"}`}>
                    {ausgewaehlt.belegt
                      ? `Geblockt bis ${formatZeit(ausgewaehlt.geblocktBis)}`
                      : `Sperre abgelaufen am ${formatZeit(ausgewaehlt.geblocktBis)} – Zeitraum ist wieder frei`}
                  </p>
                )}
                <label className="block text-sm font-semibold">
                  Name
                  <input
                    value={entwurf.name}
                    onChange={(e) => setEntwurf({ ...entwurf, name: e.target.value })}
                    className={feldKlasse}
                  />
                </label>
                <label className="block text-sm font-semibold">
                  E-Mail
                  <input
                    type="email"
                    value={entwurf.email}
                    onChange={(e) => setEntwurf({ ...entwurf, email: e.target.value })}
                    className={feldKlasse}
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Notiz / Nachricht
                  <textarea
                    value={entwurf.nachricht}
                    onChange={(e) => setEntwurf({ ...entwurf, nachricht: e.target.value })}
                    className={`${feldKlasse} h-24`}
                  />
                </label>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button type="submit" className="rounded-full bg-brand-500 px-5 py-2 font-bold text-white hover:bg-brand-600">
                    Speichern
                  </button>
                  {ausgewaehlt?.status === "ANFRAGE" && (
                    <>
                      <button
                        type="button"
                        onClick={() => bestaetigen(ausgewaehlt.id)}
                        className="rounded-full bg-tanne-500 px-5 py-2 font-bold text-white hover:opacity-90"
                      >
                        Bestätigen
                      </button>
                      <button
                        type="button"
                        onClick={() => verlaengern(ausgewaehlt.id)}
                        className="rounded-full border border-slate-300 px-5 py-2 font-semibold hover:bg-alb-50"
                      >
                        Sperre +{einstellungen?.anfrageSperreStunden ?? 24} h
                      </button>
                    </>
                  )}
                  {entwurf.id && (
                    <button
                      type="button"
                      onClick={() => loeschen(entwurf.id!)}
                      className="rounded-full border border-red-300 px-5 py-2 font-semibold text-red-700 hover:bg-red-50"
                    >
                      Löschen
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setEntwurf(null)}
                    className="rounded-full px-3 py-2 text-slate-600 hover:underline"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            )}

            <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200">
              <h2 className="mb-3 text-lg font-bold text-alb-900">Offene Anfragen ({offeneAnfragen.length})</h2>
              {offeneAnfragen.length === 0 && <p className="text-sm text-slate-500">Keine offenen Anfragen.</p>}
              <ul className="space-y-3">
                {offeneAnfragen.map((b) => (
                  <li key={b.id} className="rounded-xl bg-brand-50 p-3 text-sm">
                    <button type="button" onClick={() => {
                      bearbeiten(alsEntwurf(b));
                      setMonat(monatsAnfang(dateAusTag(b.von).getUTCFullYear(), dateAusTag(b.von).getUTCMonth()));
                    }} className="text-left">
                      <span className="block font-bold text-alb-900">{formatZeitraum(b.von, b.bis)}</span>
                      <span className="block">{b.name ?? b.titel}</span>
                      {b.geblocktBis && (
                        <span className="block text-slate-500">geblockt bis {formatZeit(b.geblocktBis)}</span>
                      )}
                    </button>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => bestaetigen(b.id)}
                        className="rounded-full bg-tanne-500 px-3 py-1 text-xs font-bold text-white"
                      >
                        Bestätigen
                      </button>
                      <button
                        type="button"
                        onClick={() => loeschen(b.id)}
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                      >
                        Ablehnen
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200">
              <h2 className="mb-3 text-lg font-bold text-alb-900">Kommende Buchungen</h2>
              {kommende.length === 0 && <p className="text-sm text-slate-500">Keine kommenden Buchungen.</p>}
              <ul className="divide-y divide-slate-100 text-sm">
                {kommende.slice(0, 5).map((b) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => {
                        bearbeiten(alsEntwurf(b));
                        setMonat(monatsAnfang(dateAusTag(b.von).getUTCFullYear(), dateAusTag(b.von).getUTCMonth()));
                      }}
                      className="w-full py-2 text-left hover:text-brand-600"
                    >
                      <span className="font-semibold">{formatZeitraum(b.von, b.bis)}</span> · {b.titel}
                    </button>
                  </li>
                ))}
              </ul>
              {kommende.length > 5 && (
                <p className="mt-2 text-sm text-slate-500">
                  und {kommende.length - 5} weitere – im Kalender durchblättern.
                </p>
              )}
            </section>

            {einstellungen && (
              <form
                onSubmit={einstellungenSpeichern}
                className="space-y-3 rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200"
              >
                <h2 className="text-lg font-bold text-alb-900">Einstellungen</h2>
                <label className="block text-sm font-semibold">
                  Buchbar für die nächsten … Tage
                  <input
                    type="number"
                    min={1}
                    max={1095}
                    required
                    value={einstellungen.buchungshorizontTage}
                    onChange={(e) =>
                      setEinstellungen({ ...einstellungen, buchungshorizontTage: Number(e.target.value) })
                    }
                    className={feldKlasse}
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Anfrage blockiert den Termin für … Stunden
                  <input
                    type="number"
                    min={1}
                    max={720}
                    required
                    value={einstellungen.anfrageSperreStunden}
                    onChange={(e) =>
                      setEinstellungen({ ...einstellungen, anfrageSperreStunden: Number(e.target.value) })
                    }
                    className={feldKlasse}
                  />
                </label>
                <button type="submit" className="rounded-full bg-brand-500 px-5 py-2 font-bold text-white hover:bg-brand-600">
                  Einstellungen speichern
                </button>

                <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <h3 className="font-bold text-alb-900">Kalender-Abo (ICS)</h3>
                  <IcsLink label="Öffentlich – nur „Belegt“" url={icsOeffentlich} />
                  {icsIntern ? (
                    <IcsLink label="Intern – mit Text und Kontaktdaten (nicht weitergeben)" url={icsIntern} />
                  ) : (
                    <p className="text-slate-500">
                      Für das interne Abo mit Details die Umgebungsvariable <code>KALENDER_ICS_TOKEN</code> setzen.
                    </p>
                  )}
                </div>
              </form>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

const IcsLink = ({ label, url }: { label: string; url: string }) => {
  const [kopiert, setKopiert] = useState(false);
  return (
    <div>
      <p className="mb-1 font-semibold">{label}</p>
      <div className="flex gap-2">
        <input readOnly value={url} className={`${feldKlasse} text-xs`} onFocus={(e) => e.target.select()} />
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            setKopiert(true);
            setTimeout(() => setKopiert(false), 1500);
          }}
          className="shrink-0 rounded-lg border border-slate-300 px-3 hover:bg-alb-50"
          aria-label="Link kopieren"
        >
          {kopiert ? "✓" : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default BuchungsKalenderAdmin;
