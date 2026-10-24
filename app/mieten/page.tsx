import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HuettenGalerie from "@/components/HuettenGalerie";
import MietAnfrageForm from "@/components/MietAnfrageForm";
import HuettenTermine from "@/components/HuettenTermine";

// Öffentliche Termine kommen bei jedem Aufruf frisch aus der Datenbank
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skihütte – Skiclub Wehingen",
  description:
    "Die Skihütte des Skiclubs Wehingen auf dem Steighof: Bilder, Mietpreise und Mietanfrage an den Hüttenwart.",
};

const Mieten = () => (
  <div>
    <PageHeader eyebrow="Auf dem Steighof" title="Unsere Skihütte">
      Die gemütliche Skihütte liegt auf dem Steighof, direkt an der
      Langlaufloipe, und lädt im Winter zu einer Pause nach dem Langlaufen
      ein. Neben warmen Getränken und einer urigen Atmosphäre bietet sie auch
      Platz für gesellige Stunden.
    </PageHeader>

    <div className="pt-12 sm:pt-16">
      <HuettenTermine />
      <div className="pt-4">
        <HuettenGalerie />
      </div>
    </div>

    {/* KONTAKT-FORMULAR */}
    <section id="anfrage" className="scroll-mt-24 bg-alb-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-brand-600">Mietanfrage</p>
          <h2 className="mt-3 text-3xl font-extrabold text-alb-900 sm:text-4xl">
            Ihre Anfrage an den Hüttenwart
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Bilder der Skihütte sowie die Mietpreise finden Sie weiter oben auf
            dieser Seite.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-10 lg:col-span-8">
          <MietAnfrageForm />
        </div>
      </div>
    </section>
  </div>
);

export default Mieten;
