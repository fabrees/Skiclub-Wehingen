import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Layers, Route, TrendingDown } from "lucide-react";
import SponsorList from "@/components/SponsorList";

export const metadata: Metadata = {
  title: "MTB-Trail – Skiclub Wehingen",
  description:
    "Der erste Mountainbike-Trail auf dem Heuberg: 1,4 km Streckenlänge, 110 Tiefenmeter und 3 Abschnitte. Alle Infos zum Trail, zum Trailbauer Trailfabrik und zu unseren Sponsoren.",
};

const eckdaten = [
  { icon: Route, wert: "1,4 km", label: "Streckenlänge", iconClass: "bg-brand-100 text-brand-600" },
  { icon: TrendingDown, wert: "110 m", label: "Tiefenmeter", iconClass: "bg-alb-100 text-alb-600" },
  { icon: Layers, wert: "3", label: "Abschnitte", iconClass: "bg-tanne-50 text-tanne-500" },
];

// Streckenverlauf von oben (Start) nach unten (Ziel)
const verlauf = [
  { name: "Start", detail: "Forstweg zur Skihütte" },
  { name: "Abschnitt 3 – Oben", laenge: "ca. 426 m", tiefe: "ca. 30 Tiefenmeter" },
  { name: "Abschnitt 2 – Mitte", laenge: "ca. 411 m", tiefe: "ca. 40 Tiefenmeter" },
  { name: "Transfer", detail: "ca. 100 m auf dem Kiesweg" },
  { name: "Abschnitt 1 – Unten", laenge: "ca. 580 m", tiefe: "ca. 40 Tiefenmeter" },
  { name: "Ziel", detail: "Parkplatz des Skilifts" },
];

const partner = ["Gemeinde Wehingen", "Forst", "Naturpark Obere Donau"];

const MtbTrail = () => {
  return (
    <div>
      {/* SEITENKOPF */}
      <section className="bg-alb-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-tanne-500">Neu auf dem Heuberg</p>
            <h1 className="mt-3 text-4xl font-extrabold text-alb-900 sm:text-5xl">MTB-Trail</h1>
            <p className="mt-3 text-xl font-semibold text-alb-600">
              Der erste Mountainbike-Trail auf dem Heuberg
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed">
              Neue Wege, neuer Trail: Der Skiclub Wehingen baut gemeinsam mit
              der Gemeinde, dem Forst und dem Naturpark Obere Donau den ersten
              Mountainbike-Trail auf dem Heuberg.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#strecke"
                className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow hover:bg-brand-600"
              >
                Zum Streckenverlauf
              </a>
              <a
                href="#sponsoren"
                className="rounded-full bg-white px-6 py-3 font-bold text-alb-900 ring-1 ring-slate-300 hover:ring-brand-500"
              >
                Trail unterstützen
              </a>
            </div>
          </div>

          <dl className="grid gap-4 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
            {eckdaten.map((daten) => {
              const Icon = daten.icon;
              return (
                <div key={daten.label} className="flex items-center gap-4">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${daten.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-slate-500">{daten.label}</dt>
                    <dd className="text-2xl font-extrabold text-alb-900">{daten.wert}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* PROJEKT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-brand-600">Über das Projekt</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
            Neue Wege – neuer Trail
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed">
            <p>
              Der Skiclub Wehingen steht seit 1979 für Sport, Gemeinschaft und
              die Begeisterung für unsere Heimat und die Berge. Mit fast 250
              Mitgliedern sind wir fest in der Gemeinde verwurzelt und gehen mit
              dem neuen Mountainbike-Trail einen weiteren Schritt in die Zukunft.
            </p>
            <p>
              Neue Impulse in der Vorstandschaft haben dem Verein in den
              vergangenen Jahren zusätzlichen Schwung verliehen und den Blick
              verstärkt in die Zukunft gerichtet. Denn während
              die Winter zunehmend schneeärmer werden, gehört Mountainbiking zu
              den großen Trends im Breitensport. Mit dem Trail verbinden wir
              unsere Tradition mit einem modernen, ganzjährigen Sportangebot für
              Jung und Alt.
            </p>
            <p>
              Wir sind mächtig stolz auf dieses Projekt und besonders dankbar
              für die große Unterstützung durch die Gemeinde Wehingen, den
              Forst, den Naturpark Obere Donau und den großen Zuspruch aus der
              Bevölkerung. Gemeinsam schaffen wir etwas, das uns und unsere
              Region bewegt.
            </p>
          </div>
        </div>

        <aside className="self-start rounded-2xl bg-tanne-50 p-6 lg:col-span-4 lg:col-start-9 lg:mt-14">
          <h3 className="text-xl font-extrabold text-alb-900">Gemeinsam mit</h3>
          <ul className="mt-4 divide-y divide-tanne-500/20">
            {partner.map((name) => (
              <li key={name} className="py-3 font-semibold text-alb-900">
                {name}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* STRECKE */}
      <section id="strecke" className="scroll-mt-24 bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow text-brand-600">Streckenverlauf</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Der Trail</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            1,4 Kilometer Strecke mit 110 Tiefenmetern, aufgeteilt in drei
            Abschnitte – vom Forstweg zur Skihütte bis hinunter zum Parkplatz
            des Skilifts.
          </p>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
            <figure className="lg:col-span-7">
              <Image
                src="/mtb/trail-karte.png"
                alt="Karte des MTB-Trails mit den drei Abschnitten"
                width={800}
                height={363}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="h-auto w-full rounded-2xl bg-white ring-1 ring-slate-200"
              />
              <figcaption className="mt-3 text-sm text-slate-500">
                Zwischen Abschnitt 2 und Abschnitt 1 liegt ein Transfer von ca.
                100 Metern auf dem Kiesweg.
              </figcaption>
            </figure>

            <ol className="rounded-2xl bg-white ring-1 ring-slate-200 lg:col-span-5">
              {verlauf.map((punkt, index) => (
                <li
                  key={punkt.name}
                  className="flex items-baseline justify-between gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="w-5 shrink-0 text-sm font-bold text-slate-400">{index + 1}</span>
                    <span className="font-bold text-alb-900">{punkt.name}</span>
                  </span>
                  <span className="text-right text-sm sm:text-base">
                    {punkt.laenge ? (
                      <>
                        <span className="font-bold text-alb-900">{punkt.laenge}</span>
                        <span className="block text-sm text-slate-500">{punkt.tiefe}</span>
                      </>
                    ) : (
                      <span className="text-slate-500">{punkt.detail}</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* TRAILFABRIK */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-alb-50 p-8 lg:col-span-5">
          <Image
            src="/mtb/trailfabrik-logo.png"
            alt="Logo der Trailfabrik"
            width={240}
            height={240}
            className="h-32 w-auto"
          />
          <Image
            src="/mtb/trailfabrik-team.png"
            alt="Das Team der Trailfabrik"
            width={320}
            height={213}
            className="h-auto w-full max-w-[320px] rounded-xl"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow text-brand-600">Der Trailbauer</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Trailfabrik</h2>
          <p className="mt-2 text-xl font-semibold text-alb-600">„Deine Trails, unser Handwerk.“</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed">
            <p>
              Wir freuen uns sehr, als regionale Firma aus Hausen o. V. das
              Projekt in Wehingen umsetzen zu dürfen. Die gemeinsamen
              Vorbereitungen mit dem Skiverein haben uns bereits viel Freude
              bereitet und gezeigt, wie viel Herzblut in diesem Projekt steckt.
            </p>
            <p>
              Was uns aber noch mehr begeistert, ist das Gelände, in das wir den
              Trail zaubern dürfen. Die abwechslungsreichen natürlichen
              Gegebenheiten bieten uns die perfekte Grundlage für einen
              vielseitigen und spannenden Trailverlauf.
            </p>
            <p>
              Wir werden einen Trail bauen, der sowohl Anfängern als auch
              Fortgeschrittenen jede Menge Spaß bietet. Von den ersten
              Erfahrungen auf dem Bike bis hin zu anspruchsvolleren Passagen
              soll jeder auf seine Kosten kommen und die Möglichkeit haben,
              seine eigenen Fähigkeiten weiterzuentwickeln.
            </p>
            <p>
              Dabei entsteht ein Angebot für die ganze Region – eine Chance, den
              Mountainbike-Sport in unserer Heimat weiterzuentwickeln, Menschen
              zu bewegen und einen attraktiven Treffpunkt für Groß und Klein zu
              schaffen.
            </p>
          </div>
        </div>
      </section>

      {/* SPONSOREN */}
      <section id="sponsoren" className="scroll-mt-24 bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow text-brand-600">Unterstützer</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Unsere Sponsoren</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            Bau, Pflege und langfristiger Unterhalt des MTB-Trails sind mit
            erheblichen Kosten verbunden. Diesen Partnern danken wir dafür, dass
            sie den Trail möglich machen.
          </p>
          <div className="mt-10">
            <SponsorList />
          </div>
        </div>
      </section>

      {/* FÖRDERER */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-center text-sm font-bold text-slate-500">Gefördert durch</p>
        <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
          <Image
            src="/mtb/naturpark-obere-donau.png"
            alt="Logo Naturpark Obere Donau"
            width={174}
            height={141}
            className="h-20 w-auto"
          />
          <Image
            src="/mtb/foerderung-eu-bw.png"
            alt="Kofinanziert von der Europäischen Union, gefördert durch das Ministerium für Ländlichen Raum, Landwirtschaft und Heimat Baden-Württemberg"
            width={800}
            height={72}
            className="h-auto w-full max-w-[560px]"
          />
        </div>
      </section>
    </div>
  );
};

export default MtbTrail;
