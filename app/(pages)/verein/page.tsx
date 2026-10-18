import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Verein – Skiclub Wehingen",
  description: "Alle wichtigen Informationen über den Skiclub Wehingen und wie dieser entstanden ist",
};

const ausschuss = [
  { name: "Gerd Linse", rolle: "1. Vorstand", mail: "gerd@sc-wehingen.de" },
  { name: "Katha Heyer", rolle: "2. Vorstand", mail: "katha@sc-wehingen.de" },
  { name: "Reimar Oelte", rolle: "Kassierer", mail: "reimar@sc-wehingen.de" },
  { name: "Daniel Rieger", rolle: "Schriftführer", mail: "daniel@sc-wehingen.de" },
  { name: "Rüdiger Tack", rolle: "Hüttenwart", mail: "ruediger@sc-wehingen.de" },
  { name: "Johannes Klaiber", rolle: "Beisitzer", mail: "johannes@sc-wehingen.de" },
  { name: "Fabian Rees", rolle: "Beisitzer", mail: "fabian@sc-wehingen.de" },
  { name: "Klemens Burkhard", rolle: "Beisitzer", mail: "klemens@sc-wehingen.de" },
  { name: "Anne Merkt", rolle: "Beisitzerin", mail: "anne@sc-wehingen.de" },
];

const initialen = (name: string) =>
  name
    .split(" ")
    .map((teil) => teil[0])
    .join("");

const Verein = () => {
  return (
    <div>
      <PageHeader
        eyebrow="Verein"
        title="Skiclub Wehingen"
        subtitle="Ausschuss, Vereinsgeschichte und unser Maskottchen Fossilius"
      />

      {/* AUSSCHUSS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="eyebrow text-brand-600">Der Ausschuss des Skiclubs Wehingen</p>
        <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Abteilungsleitung</h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ausschuss.map((person) => (
            <li
              key={person.mail}
              className="flex items-center gap-4 rounded-2xl p-5 ring-1 ring-slate-200"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-alb-100 text-lg font-extrabold text-alb-600">
                {initialen(person.name)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-slate-500">{person.rolle}</span>
                <span className="block text-lg font-bold text-alb-900">{person.name}</span>
                <a
                  href={`mailto:${person.mail}`}
                  className="block truncate text-sm text-brand-600 hover:underline"
                >
                  {person.mail}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* VEREINSGESCHICHTE */}
      <section className="bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow text-brand-600">Vereinsgeschichte</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Wie alles begann</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed">
            <p>
              Die ersten Jahre des Skifahrens in Wehingen, etwa 1920-1921, sind
              kaum dokumentiert. Den entscheidenden Anstoß gab der Gosheimer
              Lehrer Mangold, der zusammen mit Skifahrern wie Simon Weiß und
              Konrad Mayer zahlreiche Skiwanderungen organisierte. In den späten
              1920er Jahren förderte Lehrer Josef Freudemann besonders das
              Interesse der Jugend am Skifahren. Der erste Skiwettbewerb fand am
              3. Februar 1929 im Rahmen des Skifahrertreffens des oberen
              Schwarzwaldturngaues statt und bot Langlauf- und Sprunglauf in
              zwei Klassen an.
            </p>
            <p>
              1933 wurde schließlich die Skiabteilung im Turnverein Wehingen
              gegründet, und Moritz Hafen übernahm die Leitung. Im Januar 1935
              wurde das Kreisschneelauftreffen ausgetragen, und bis zum
              Kriegseintritt im Jahr 1939 blühte der Skisport in Wehingen auf.
              Trotz der Kriegsjahre wurden 1941 noch Skiläufe für Jugendliche
              durchgeführt.
            </p>
            <p>
              Nach dem Krieg, mit der Gründung eines neuen Sportvereins am 13.
              Juli 1947, wurden die Sparten Fußball, Leichtathletik und
              Wintersport etabliert. Unter der Leitung von Raimund Walz erlebte
              der Wintersport eine neue Ära. Bereits am 31. Januar 1949 fand der
              erste Skilauf nach der Wiedergründung des Turnvereins statt. In
              den folgenden Jahren kam es jedoch zu internen Schwierigkeiten, die
              das Interesse am Skifahren verringerten. Die verbesserte
              Erreichbarkeit der Skigebiete durch den motorisierten Verkehr
              führte jedoch 1979 zur Gründung eines neuen Skivereins in Wehingen.
            </p>
          </div>
        </div>
      </section>

      {/* MASKOTTCHEN */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="flex justify-center rounded-3xl bg-alb-50 p-8 lg:col-span-5">
          <Image
            src="/Fossi.gif"
            alt="Fossilius, das Maskottchen des Skiclubs"
            width={605}
            height={500}
            className="h-auto w-full max-w-sm"
            unoptimized
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow text-brand-600">Fossilius</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Unser Maskottchen</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed">
            <p>
              Mein Name ist Fossilius und ich repräsentiere die Region um die
              höchsten Berge der Schwäbischen Alb, die „Region der 10
              Tausender“. Hier im Schwäbischen Jura findet ihr überall
              Geschwister von mir. Kennt ihr die höchsten Berge der Schwäbischen
              Alb? Dazu gehören der Lemberg, der Dreifaltigkeitsberg, das
              Klippeneck, der Hochberg, der Oberhohenberg und die Hochfläche
              zwischen Bära und dem Donautal – den Heuberg.
            </p>
            <p>
              Diese idyllische Landschaft eignet sich hervorragend für aktive
              Freizeitgestaltung und ist ein idealer Ort für Wochenendausflüge.
              Besucht auch „www.region-der-zehn-tausender.de“ für mehr
              Informationen. Geologisch zeigen die höchsten Berge der
              Schwäbischen Alb Schichten des braunen und weißen Juras mit
              faszinierenden Fossilienfunden, wie dem Ammoniten, dem Maskottchen
              der „Region der 10 Tausender“ und Namensgeber unseres Laufs.
            </p>
            <p>
              Hier lässt es sich gut leben, mit attraktiven Arbeitsplätzen und
              gemütlichen Hotels und Gaststätten zum Einkehren und Verweilen. Ich
              freue mich, dass immer mehr Sportlerinnen und Sportler an meinem
              Lauf teilnehmen – viele davon sind in der Lauf-Community bekannt.
              Man trifft sich, kennt sich und feiert gemeinsam die Erfolge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verein;
