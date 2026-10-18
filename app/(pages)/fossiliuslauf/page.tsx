import Image from "next/image";
import { Metadata } from "next";
import { CalendarDays, Clock, MapPin, Trophy } from "lucide-react";
import HoverButton from "@/components/HoverButton";
import Sprinter from "@/components/Sprinter";
import MapConsent from "@/components/MapConsent";
import {
  ANMELDUNG_URL,
  ERGEBNISSE_URL,
  fossiliuslaufTermin,
  Gruppe,
  LAEUFE,
  MAPS_EMBED_URL,
  MAPS_LINK_URL,
} from "@/lib/fossiliuslauf";

// Stündlich neu rendern, damit das Datum des nächsten Laufs aktuell bleibt
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fossiliuslauf – Skiclub Wehingen",
  description:
    "Alle Infos zum Fossiliuslauf in Wehingen: Termin, Zeitplan, Strecken, Startgeld, Anmeldung und Ergebnisse.",
};

const gruppen: {
  gruppe: Gruppe;
  titel: string;
  img: string;
  text: string;
  akzent: string;
}[] = [
  {
    gruppe: "Erwachsene",
    titel: "Lauf für Erwachsene",
    img: "/lauf-erwachsen.png",
    text: "Für alle ab 15 Jahren: der anspruchsvolle Hauptlauf, der Jedermannlauf für Genießer und eine Nordic-Walking-Strecke.",
    akzent: "bg-brand-50 text-brand-700",
  },
  {
    gruppe: "Jugendliche",
    titel: "Lauf für Jugendliche",
    img: "/lauf-jung.png",
    text: "Der Schülerlauf führt je nach Alter über 1,5 km (8–11 Jahre) oder 3,0 km (12–15 Jahre).",
    akzent: "bg-tanne-50 text-tanne-500",
  },
  {
    gruppe: "Kinder",
    titel: "Lauf für Kinder",
    img: "/lauf-kinder.png",
    text: "Bambini (2–4 Jahre) und Kids (5–7 Jahre) laufen kostenlos – der erste Wettkampf mit Zuschauern am Streckenrand.",
    akzent: "bg-alb-100 text-alb-600",
  },
];

const Fossiliuslauf = () => {
  const datum = fossiliuslaufTermin().lang;

  return (
    <div>
      <HoverButton />

      {/* SEITENKOPF */}
      <section className="bg-alb-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-brand-600">Seit 1985 · Teil des Silberdistel-Alb-Cups</p>
            <h1 className="mt-3 text-4xl font-extrabold text-alb-900 sm:text-5xl">
              Fossiliuslauf
            </h1>
            <p className="mt-3 text-xl font-semibold text-alb-600">
              „Laufen, wo die Alb am höchsten ist“
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed">
              Weil 1985 der Schnee ausblieb, veranstaltete der Skiclub am 6.
              Oktober kurzerhand ein Familiensportfest – mit über 150
              Teilnehmenden. Seitdem findet der Fossiliuslauf jedes Jahr am
              letzten Septembersonntag statt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ANMELDUNG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow hover:bg-brand-600"
              >
                Jetzt anmelden
              </a>
              <a
                href="#zeitplan"
                className="rounded-full bg-white px-6 py-3 font-bold text-alb-900 ring-1 ring-slate-300 hover:ring-brand-500"
              >
                Zeitplan &amp; Startgeld
              </a>
            </div>
          </div>

          <dl className="grid gap-4 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:grid-cols-2 lg:w-[380px] lg:grid-cols-1">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-slate-500">Nächster Termin</dt>
                <dd className="font-bold text-alb-900">{datum}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-alb-100 text-alb-600">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-slate-500">Starts</dt>
                <dd className="font-bold text-alb-900">ab 09:30 Uhr · Hauptlauf 11:00 Uhr</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tanne-50 text-tanne-500">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-slate-500">Ort</dt>
                <dd className="font-bold text-alb-900">
                  Skiclub Wehingen ·{" "}
                  <a href="#anfahrt" className="text-brand-600 hover:underline">Anfahrt</a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      {/* ZEITPLAN */}
      <section id="zeitplan" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
        <p className="eyebrow text-brand-600">Auf einen Blick</p>
        <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
          Zeitplan, Strecken &amp; Startgeld
        </h2>

        {/* Desktop: Tabelle */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl ring-1 ring-slate-200 sm:block">
          <table className="w-full text-left">
            <thead className="bg-alb-900 text-sm text-white">
              <tr>
                <th className="px-5 py-3 font-bold">Start</th>
                <th className="px-5 py-3 font-bold">Lauf</th>
                <th className="px-5 py-3 font-bold">Alter</th>
                <th className="px-5 py-3 font-bold">Strecke</th>
                <th className="px-5 py-3 text-right font-bold">Startgeld</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-lg">
              {LAEUFE.map((lauf) => (
                <tr key={`${lauf.name}-${lauf.strecke}`} className="even:bg-alb-50">
                  <td className="px-5 py-4 font-bold text-alb-900">{lauf.start} Uhr</td>
                  <td className="px-5 py-4 font-bold text-alb-900">{lauf.name}</td>
                  <td className="px-5 py-4">{lauf.alter}</td>
                  <td className="px-5 py-4">{lauf.strecke}</td>
                  <td className="px-5 py-4 text-right">{lauf.startgeld}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobil: Karten */}
        <ul className="mt-8 space-y-3 sm:hidden">
          {LAEUFE.map((lauf) => (
            <li
              key={`${lauf.name}-${lauf.strecke}`}
              className="flex items-center gap-4 rounded-2xl bg-alb-50 p-4"
            >
              <span className="w-14 shrink-0 text-lg font-extrabold text-alb-900">{lauf.start}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-alb-900">
                  {lauf.name} · {lauf.strecke}
                </span>
                <span className="block text-sm text-slate-500">{lauf.alter}</span>
              </span>
              <span className="shrink-0 text-sm font-bold">{lauf.startgeld}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* LÄUFE NACH ALTERSGRUPPE */}
      <section className="bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow text-brand-600">Für jedes Alter</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Die Läufe</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {gruppen.map((g) => (
              <article key={g.gruppe} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={g.img}
                    alt={g.titel}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-alb-900 sm:text-2xl">{g.titel}</h3>
                  <p className="mt-2 leading-relaxed">{g.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {LAEUFE.filter((l) => l.gruppe === g.gruppe).map((l) => (
                      <li
                        key={`${l.name}-${l.strecke}`}
                        className={`rounded-full px-3 py-1 text-sm font-bold ${g.akzent}`}
                      >
                        {l.name} {l.strecke}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ERGEBNISSE */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <Sprinter className="mx-auto hidden h-auto w-full max-w-md lg:block" />
        <div>
          <p className="eyebrow text-brand-600">Ergebnisse</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
            Ergebnisse &amp; Urkunden
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">
            Alle Ergebnislisten des Fossiliuslaufs – vom Bambinilauf bis zum
            Hauptlauf – finden Sie live und übersichtlich bei raceresult.
          </p>
          <a
            href={ERGEBNISSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow hover:bg-brand-600"
          >
            <Trophy className="h-5 w-5" />
            Zu den Ergebnissen
          </a>
        </div>
      </section>

      {/* ANFAHRT */}
      <section id="anfahrt" className="scroll-mt-24 bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-600">Anfahrt</p>
              <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
                So finden Sie uns
              </h2>
            </div>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-alb-600 hover:text-brand-600"
            >
              In Google Maps öffnen →
            </a>
          </div>
          <MapConsent src={MAPS_EMBED_URL} title="Karte: Skiclub Wehingen e.V." />
        </div>
      </section>
    </div>
  );
};

export default Fossiliuslauf;
