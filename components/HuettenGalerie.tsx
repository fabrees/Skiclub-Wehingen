import Image from "next/image";
import { DOKUMENTE } from "@/lib/verein";

const bilder = [
  "/SkihuetteSommerAußen.jpg",
  "/Skihuette2.jpg",
  "/bettenNeu.jpg",
  "/bettenNeu2.jpg",
  "/neueFotos1.jpg",
  "/neueFotos2.jpg",
  "/neueFotos3.jpg",
  "/neueFotos4.jpg",
  "/neueFotos6.jpg",
  "/neueFotos7.jpg",
  "/SkihuetteSommer.jpg",
  "/Treppenhaus.jpg",
];

const HuettenGalerie = () => {
  const mietpreiseLink = DOKUMENTE.mietpreise;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-600">Ganzjährig</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
            Skihütte mieten
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Die Hütte kann man auch mieten! Kontaktieren Sie unseren Hüttenwart
            und vereinbaren Sie mit ihm einen geeigneten Termin zur
            Hüttenmietung.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#anfrage"
            className="rounded-full bg-white px-6 py-3 font-bold text-alb-900 ring-1 ring-slate-300 hover:ring-brand-500"
          >
            Zur Mietanfrage
          </a>
          <a
            href={mietpreiseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
          >
            Zu den Mietpreisen →
          </a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {bilder.map((src, index) => (
          <div
            key={src}
            className={`relative overflow-hidden rounded-2xl bg-alb-50 ${
              index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <Image
              src={src}
              alt={`Skihütte Bild ${index + 1}`}
              fill
              sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HuettenGalerie;
