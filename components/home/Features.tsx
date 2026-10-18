import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_SKILIFT_URL } from "@/lib/verein";
import { fossiliuslaufTermin } from "@/lib/fossiliuslauf";

export const SkiliftFeature = () => (
  <section id="skilift" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl lg:order-2">
      <Image
        src="/lift.jpg"
        alt="Skilift des SC Wehingen"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
    <div>
      <p className="eyebrow text-alb-600">Winter</p>
      <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
        Skilift des SC Wehingen
      </h2>
      <p className="mt-5 text-lg leading-relaxed">
        Der Parkplatz des Skilifts befindet sich in der zweiten Kurve der
        Wehingersteige.
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-alb-50 p-5">
          <dt className="text-xs font-bold text-slate-500">Öffnungszeiten</dt>
          <dd className="mt-1 font-extrabold text-alb-900">Mi, Sa &amp; So</dd>
          <dd className="font-extrabold text-alb-900">13:30 – 16:30 Uhr</dd>
          <dd className="mt-1 text-xs text-slate-500">bei ausreichender Schneelage</dd>
        </div>
        <div className="rounded-2xl bg-alb-50 p-5">
          <dt className="text-xs font-bold text-slate-500">Aktueller Betrieb</dt>
          <dd className="mt-1 font-extrabold text-alb-900">WhatsApp-Kanal</dd>
          <dd className="mt-1 text-sm">Infos, ob der Lift heute läuft</dd>
        </div>
      </dl>
      <a
        href={WHATSAPP_SKILIFT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
      >
        WhatsApp-Kanal abonnieren
      </a>
    </div>
  </section>
);

export const FossiliuslaufFeature = () => {
  const termin = fossiliuslaufTermin();

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/lauf-erwachsen.png"
            alt="Läuferinnen und Läufer beim Fossiliuslauf"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-2 rounded-2xl bg-brand-500 px-6 py-4 text-center text-white shadow-xl sm:-right-6">
          <p className="eyebrow text-brand-100">Nächster Termin</p>
          <p className={`mt-1 font-extrabold leading-none ${termin.fest ? "text-3xl" : "text-2xl"}`}>
            {termin.kurz}
          </p>
          <p className="text-sm font-bold">{termin.jahr}</p>
        </div>
      </div>
      <div>
        <p className="eyebrow text-brand-600">Seit 1985</p>
        <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">Fossiliuslauf</h2>
        <p className="mt-2 text-xl font-semibold text-alb-600">
          „Laufen, wo die Alb am höchsten ist“
        </p>
        <p className="mt-5 text-lg leading-relaxed">
          Weil 1985 der Schnee ausblieb, veranstaltete der Skiclub kurzerhand
          ein Familiensportfest – mit über 150 Teilnehmenden. Heute ist der
          Lauf fester Bestandteil des Jahresprogramms und Teil des
          „Silberdistel-Alb-Cups“.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            ["Hauptlauf", "11,2 km"],
            ["Nordic Walking", "8,0 km"],
            ["Jedermann", "6,0 km"],
          ].map(([label, wert]) => (
            <div key={label} className="rounded-2xl bg-brand-50 p-4">
              <dt className="text-xs font-bold text-slate-500">{label}</dt>
              <dd className="text-xl font-extrabold text-alb-900 sm:text-2xl">{wert}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/fossiliuslauf"
          className="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
        >
          Alle Infos &amp; Anmeldung
        </Link>
      </div>
    </section>
  );
};

export const MtbFeature = () => (
  <section className="bg-alb-900 text-alb-100">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
      <div className="lg:order-2">
        <Image
          src="/mtb/trail-karte.png"
          alt="Karte des MTB-Trails"
          width={1600}
          height={700}
          className="w-full rounded-3xl bg-white shadow-2xl"
        />
      </div>
      <div>
        <p className="eyebrow text-brand-100">Neu auf dem Heuberg</p>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Unser MTB-Trail</h2>
        <p className="mt-5 text-lg leading-relaxed">
          Während die Winter schneeärmer werden, verbinden wir unsere
          Tradition mit einem modernen, ganzjährigen Sportangebot für Jung und
          Alt.
        </p>
        <div className="mt-8 flex flex-wrap gap-8">
          {[
            ["1,4 km", "Streckenlänge"],
            ["110 m", "Tiefenmeter"],
            ["3", "Abschnitte"],
          ].map(([wert, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold text-white">{wert}</p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>
        <Link
          href="/mtb-trail"
          className="mt-10 inline-block rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
        >
          Alles zum Trail →
        </Link>
      </div>
    </div>
  </section>
);
