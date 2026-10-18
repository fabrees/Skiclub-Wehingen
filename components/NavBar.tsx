"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDocumentLink } from "@/lib/useDocumentLink";
import {
  LINK_ID,
  LOIPE_URL,
  NAV_ITEMS,
  WHATSAPP_SKILIFT_URL,
} from "@/lib/verein";

const StatusDot = () => (
  <span className="relative flex h-2.5 w-2.5 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
  </span>
);

const TopBar = () => (
  <div className="bg-alb-900 text-sm text-alb-100">
    <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      <a
        href={WHATSAPP_SKILIFT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 items-center gap-2 hover:text-white"
      >
        <StatusDot />
        <span className="truncate">
          <span className="sm:hidden">Skilift aktuell</span>
          <span className="hidden sm:inline">
            Skilift aktuell: Infos zum Betrieb im WhatsApp-Kanal
          </span>
        </span>
      </a>
      <a
        href={LOIPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 items-center gap-2 hover:text-white"
      >
        <StatusDot />
        <span className="truncate">
          <span className="sm:hidden">Loipe aktuell</span>
          <span className="hidden sm:inline">
            Loipe aktuell: Spurzustand &amp; Infos
          </span>
        </span>
      </a>
    </div>
  </div>
);

const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const beitrittLink = useDocumentLink(LINK_ID.beitrittserklaerung);

  //to close the Hamburger Menu when clicking on the other contant of the Page
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <TopBar />

      <header
        ref={menuRef}
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Logo.gif"
              alt="Logo Skiclub Wehingen"
              width={81}
              height={48}
              className="h-12 w-auto"
              unoptimized
            />
            <span className="hidden leading-tight lg:block">
              <span className="block font-extrabold text-alb-900">
                Skiclub Wehingen
              </span>
              <span className="block text-xs text-slate-500">e.V. · seit 1979</span>
            </span>
          </Link>

          {/* DESKTOP */}
          <nav className="hidden items-center gap-1 text-[15px] font-semibold text-alb-900 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 transition ${
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-600"
                    : "hover:bg-alb-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={beitrittLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-full bg-brand-500 px-5 py-2.5 text-white shadow-sm transition hover:bg-brand-600"
            >
              Mitglied werden
            </a>
          </nav>

          {/* MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-alb-900 hover:bg-alb-50 md:hidden"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4 font-semibold text-alb-900">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 ${
                      isActive(item.href)
                        ? "bg-brand-50 text-brand-600"
                        : "hover:bg-alb-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={beitrittLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-center text-white hover:bg-brand-600"
                >
                  Mitglied werden
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default NavBar;
