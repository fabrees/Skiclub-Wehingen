"use client";
import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";

// Google Maps wird erst nach Klick geladen, damit ohne Zustimmung keine Daten an Google gehen
export default function MapConsent({ src, title }: { src: string; title: string }) {
  const [geladen, setGeladen] = useState(false);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
      {geladen ? (
        <iframe
          src={src}
          title={title}
          className="block h-[420px] w-full border-0 sm:h-[520px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="grid h-[420px] place-items-center bg-white p-6 text-center sm:h-[520px]">
          <div className="max-w-md">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand-600">
              <MapPin className="h-7 w-7" />
            </span>
            <p className="mt-4 text-lg font-bold text-alb-900">Karte anzeigen</p>
            <p className="mt-2 text-sm">
              Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu
              in unserer{" "}
              <Link href="/datenschutz" className="text-brand-600 underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <button
              onClick={() => setGeladen(true)}
              className="mt-5 rounded-full bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
            >
              Google Maps laden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
