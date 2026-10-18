import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import NewsletterCards from "../components/NewsletterCards";
import QuickInfo from "@/components/home/QuickInfo";
import Angebote from "@/components/home/Angebote";
import MitgliedCta from "@/components/home/MitgliedCta";
import {
  FossiliuslaufFeature,
  MtbFeature,
  SkiliftFeature,
} from "@/components/home/Features";

// Stündlich neu rendern, damit das Datum des nächsten Fossiliuslaufs aktuell bleibt
export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[560px] overflow-hidden sm:h-[620px]">
          <Image
            src="/Skihuette.jpg"
            alt="Skihütte des Skiclubs im Schnee"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alb-900/85 via-alb-900/50 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-20 sm:px-6 sm:pb-24">
            <p className="eyebrow mb-4 text-brand-100">Traditionsverein auf dem Heuberg</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Sport, Schnee &amp; Gemeinschaft – auf der Alb, wo sie am höchsten ist.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Über 44 Jahre Vereinsgeschichte und ein großes Angebot an
              Aktivitäten für mehr als 225 Mitglieder.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/newsletter"
                className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow-lg hover:bg-brand-600"
              >
                Neuigkeiten lesen
              </Link>
              <Link
                href="/fossiliuslauf"
                className="rounded-full bg-white/10 px-6 py-3 font-bold text-white ring-1 ring-white/60 backdrop-blur hover:bg-white/20"
              >
                Zum Fossiliuslauf
              </Link>
            </div>
          </div>
        </div>

        <QuickInfo />
      </section>

      <Angebote />

      {/* NEUIGKEITEN */}
      <section className="bg-alb-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-600">Newsletter</p>
              <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
                Neuigkeiten aus dem Verein
              </h2>
            </div>
            <Link href="/newsletter" className="font-bold text-alb-600 hover:text-brand-600">
              Alle Beiträge →
            </Link>
          </div>
          <NewsletterCards />
        </div>
      </section>

      <MtbFeature />
      <FossiliuslaufFeature />
      <SkiliftFeature />
      <MitgliedCta />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Skiclub Wehingen Homepage",
  description: "Alle wichtigen Informationen über den Skiclub: Mieten, Fossiliuslauf, Skilift, Preise, Skiliftpreise, Neuigkeiten, Rundmails, Blog, Infos",
};
