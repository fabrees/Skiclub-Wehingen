import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  DOKUMENTE,
  LOIPE_URL,
  VORSTAND_MAIL,
  WHATSAPP_SKILIFT_URL,
} from "@/lib/verein";

const linkClass = "hover:text-white transition";

const Footer = () => {
  const beitrittLink = DOKUMENTE.mitgliedsantrag;

  return (
    <footer className="bg-alb-900 text-sm text-alb-100/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-skiclub.svg"
            alt="Logo Skiclub Wehingen"
            width={77}
            height={48}
            // Schwarzes Logo als Negativ auf dem dunklen Footer
            className="h-12 w-auto invert"
            unoptimized
          />
          <p className="mt-4">
            Skiclub Wehingen e.V. – Traditionsverein auf dem Heuberg mit
            Skilift, Skihütte, Fossiliuslauf und MTB-Trail.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Skiclub Wehingen auf Instagram (@${INSTAGRAM_HANDLE})`}
            className="group mt-5 inline-flex items-center gap-3 hover:text-white"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition group-hover:bg-white/20">
              <FaInstagram className="h-5 w-5 text-white" />
            </span>
            <span className="font-semibold">@{INSTAGRAM_HANDLE}</span>
          </a>
        </div>

        <div>
          <p className="eyebrow text-white">Entdecken</p>
          <ul className="mt-4 space-y-2">
            <li><Link href="/fossiliuslauf" className={linkClass}>Fossiliuslauf</Link></li>
            <li><Link href="/mtb-trail" className={linkClass}>MTB-Trail</Link></li>
            <li><Link href="/mieten" className={linkClass}>Skihütte mieten</Link></li>
            <li><Link href="/newsletter" className={linkClass}>Neuigkeiten</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white">Kontakt &amp; Aktuelles</p>
          <ul className="mt-4 space-y-2">
            <li><a href={`mailto:${VORSTAND_MAIL}`} className={linkClass}>{VORSTAND_MAIL}</a></li>
            <li><a href={WHATSAPP_SKILIFT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp-Kanal Skilift</a></li>
            <li><a href={LOIPE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Loipenbericht Heuberg</a></li>
            <li>Skilift: Wehingersteige, 2. Kurve</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white">Verein</p>
          <ul className="mt-4 space-y-2">
            <li><Link href="/verein" className={linkClass}>Über uns</Link></li>
            <li><a href={beitrittLink} target="_blank" rel="noopener noreferrer" className={linkClass}>Mitglied werden</a></li>
            <li><Link href="/impressum" className={linkClass}>Impressum</Link></li>
            <li><Link href="/datenschutz" className={linkClass}>Datenschutz</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs sm:px-6">
          <p>&copy; {new Date().getFullYear()} Skiclub Wehingen e.V.</p>
          <Link href="/mtb-trail" className={linkClass}>Mit Unterstützung unserer Sponsoren</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
