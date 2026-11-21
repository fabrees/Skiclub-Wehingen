"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LogOut, Mail, SquarePen } from "lucide-react";

const LINKS = [
  { href: "/admin/kalender", label: "Buchungskalender", icon: CalendarDays },
  { href: "/admin", label: "Rundmail-Übersicht", icon: Mail },
  { href: "/admin/addblog", label: "Neue Rundmail", icon: SquarePen },
];

// Navigation des Admin-Bereichs: auf dem Handy eine Leiste unter dem
// Seitenkopf, ab "lg" eine Seitenleiste neben dem Inhalt
const NavbarAdmin = () => {
  const pathname = usePathname();
  const istAktiv = (href: string) =>
    href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/editblog") : pathname.startsWith(href);

  const linkKlasse = (aktiv: boolean) =>
    `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 font-semibold transition ${
      aktiv ? "bg-brand-50 text-brand-600" : "text-alb-900 hover:bg-alb-50"
    }`;

  return (
    <nav
      aria-label="Admin-Bereich"
      className="sticky top-20 z-40 border-b border-slate-200 bg-white lg:top-24 lg:h-fit lg:w-60 lg:shrink-0 lg:rounded-2xl lg:border lg:p-3 lg:shadow-sm"
    >
      <p className="eyebrow hidden px-3 pb-2 pt-1 text-brand-600 lg:block">Admin</p>
      <div className="flex gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] text-sm lg:flex-col lg:overflow-visible lg:p-0 lg:text-base">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={linkKlasse(istAktiv(href))} aria-current={istAktiv(href) ? "page" : undefined}>
            <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
            {label}
          </Link>
        ))}
        <Link
          href="/"
          className={`${linkKlasse(false)} lg:mt-2 lg:border-t lg:border-slate-100 lg:pt-3`}
        >
          <LogOut className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
          Modus beenden
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
