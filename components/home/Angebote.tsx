import Image from "next/image";
import Link from "next/link";

const angebote = [
  {
    href: "/mieten",
    img: "/SkihuetteSommerAussen.jpg",
    season: "Ganzjährig",
    seasonClass: "text-alb-600",
    title: "Skihütte",
    text: "Urige Hütte auf dem Steighof – für gesellige Stunden und Feiern das ganze Jahr.",
  },
  {
    href: "/mtb-trail",
    img: "/mtb/trail-karte.png",
    season: "Sommer",
    seasonClass: "text-tanne-500",
    title: "MTB-Trail",
    text: "Der erste Mountainbike-Trail auf dem Heuberg: 1,4 km und 110 Tiefenmeter.",
  },
  {
    href: "/fossiliuslauf",
    img: "/lauf-erwachsen.jpg",
    season: "Herbst",
    seasonClass: "text-brand-600",
    title: "Fossiliuslauf",
    text: "„Laufen, wo die Alb am höchsten ist“ – seit 1985 am letzten Septembersonntag.",
  },
  {
    href: "/#skilift",
    img: "/Skilift.jpg",
    season: "Winter",
    seasonClass: "text-alb-600",
    title: "Skilift",
    text: "Familienfreundlicher Lift an der Wehingersteige – Parkplatz in der zweiten Kurve.",
  },
];

const Angebote = () => (
  <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-brand-600">Unser Angebot</p>
      <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
        Das ganze Jahr aktiv
      </h2>
      <p className="mt-4 text-lg">
        Im Winter auf der Piste, im Sommer auf Trail und Laufstrecke – und
        dazwischen gemütlich in der Hütte.
      </p>
    </div>

    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {angebote.map((angebot) => (
        <Link
          key={angebot.title}
          href={angebot.href}
          className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-alb-50">
            <Image
              src={angebot.img}
              alt={angebot.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <p className={`eyebrow ${angebot.seasonClass}`}>{angebot.season}</p>
            <h3 className="mt-1 text-xl font-extrabold text-alb-900">{angebot.title}</h3>
            <p className="mt-2 text-sm">{angebot.text}</p>
            <span className="mt-4 inline-flex items-center gap-1 font-bold text-brand-600">
              Mehr erfahren
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Angebote;
