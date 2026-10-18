import Link from "next/link";
import { CalendarDays, Clock, House, MessageCircle } from "lucide-react";
import { WHATSAPP_SKILIFT_URL } from "@/lib/verein";
import { fossiliuslaufTermin } from "@/lib/fossiliuslauf";

// "Das Wichtigste" – Info-Leiste, die in das Hero-Bild hineinragt
const QuickInfo = () => {
  const laufDatum = fossiliuslaufTermin().lang;

  const items = [
    {
      href: "/#skilift",
      icon: Clock,
      iconClass: "bg-alb-100 text-alb-600",
      hover: "hover:bg-alb-50",
      title: "Skilift-Öffnungszeiten",
      text: "Mi, Sa & So · 13:30–16:30 Uhr",
      hint: "bei ausreichender Schneelage",
    },
    {
      href: "/fossiliuslauf",
      icon: CalendarDays,
      iconClass: "bg-brand-100 text-brand-600",
      hover: "hover:bg-brand-50",
      title: "Fossiliuslauf",
      text: laufDatum,
      hint: "Hauptlauf ab 11:00 Uhr",
    },
    {
      href: "/mieten",
      icon: House,
      iconClass: "bg-tanne-50 text-tanne-500",
      hover: "hover:bg-tanne-50",
      title: "Skihütte mieten",
      text: "Bilder, Preise & Mietanfrage",
      hint: "auf dem Steighof",
    },
    {
      href: WHATSAPP_SKILIFT_URL,
      external: true,
      icon: MessageCircle,
      iconClass: "bg-green-100 text-green-700",
      hover: "hover:bg-alb-50",
      title: "WhatsApp-Kanal",
      text: "Aktuelles zum Liftbetrieb",
      hint: "jetzt abonnieren →",
    },
  ];

  return (
    <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6">
      <div className="grid divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.iconClass}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold text-alb-900">{item.title}</span>
                <span className="mt-1 block text-sm">{item.text}</span>
                <span className="mt-1 block text-xs text-slate-500">{item.hint}</span>
              </span>
            </>
          );
          const className = `flex gap-4 p-6 transition ${item.hover}`;

          return item.external ? (
            <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
              {content}
            </a>
          ) : (
            <Link key={item.title} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickInfo;
