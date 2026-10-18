"use client";
import Link from "next/link";
import { useDocumentLink } from "@/lib/useDocumentLink";
import { LINK_ID } from "@/lib/verein";

const MitgliedCta = () => {
  const beitrittLink = useDocumentLink(LINK_ID.beitrittserklaerung);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid items-center gap-8 rounded-3xl bg-brand-50 p-8 ring-1 ring-brand-100 sm:p-14 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-extrabold text-alb-900">Werde Teil des Skiclubs</h2>
          <p className="mt-3 max-w-2xl text-lg">
            Ob Skifahren, Laufen, Biken oder einfach Gemeinschaft erleben –
            über 225 Mitglieder freuen sich auf dich.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={beitrittLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow hover:bg-brand-600"
          >
            Beitrittserklärung (PDF)
          </a>
          <Link
            href="/verein"
            className="rounded-full bg-white px-6 py-3 font-bold text-alb-900 ring-1 ring-slate-300 hover:ring-brand-500"
          >
            Über den Verein
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MitgliedCta;
