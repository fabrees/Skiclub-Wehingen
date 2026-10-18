import Link from "next/link";
import { Metadata } from "next";
import { FaGithub } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Impressum – Skiclub Wehingen",
};

const Impressum = () => {
    return (
        <div>
            <PageHeader eyebrow="Rechtliches" title="Impressum" />
            <div className="mx-auto max-w-3xl px-4 py-16 text-lg leading-relaxed sm:px-6 sm:py-20">

            {/* Verantwortlicher */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-extrabold text-alb-900 sm:text-3xl">Angaben gemäß § 5 DDG</h2>
                <div className="rounded-2xl bg-alb-50 p-6">
                    <p className="font-semibold">Skiclub Wehingen e.V.</p>
                    <p>Vertreten durch den 1. Vorsitzenden:</p>
                    <p className="mt-2 font-medium">Gerd Linse</p>
                    <p>Vorstadtstraße 14</p>
                    <p>78564 Wehingen</p>
                    <p>
                        E-Mail: <a href="mailto:vorstand@sc-wehingen.de" className="text-brand-600 hover:underline">vorstand@sc-wehingen.de</a>
                    </p>
                </div>
            </section>

            {/* Registerangaben */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-extrabold text-alb-900 sm:text-3xl">Registereintrag</h2>
                <p>Eingetragen im Vereinsregister</p>
                <p>Registergericht: Amtsgericht Spaichingen</p>
                <p>Registernummer: VR 195</p>
                <p>Steuernummer: 21105/30603</p>
                <p className="mt-2">Umsatzsteuer-Identifikationsnummer (USt-IdNr.): gemäß § 27a UStG nicht erforderlich</p>
            </section>

            {/* Haftungsausschluss */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-extrabold text-alb-900 sm:text-3xl">Haftungsausschluss</h2>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">1. Inhalt des Onlineangebotes</h3>
                <p className="mb-4">
                    Der Verein übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der
                    bereitgestellten Informationen.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">2. Verweise und Links</h3>
                <p className="mb-4">
                    Für direkte oder indirekte Verweise auf fremde Webseiten (Hyperlinks), die außerhalb des Verantwortungsbereiches
                    des Vereins liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Verein
                    von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger
                    Inhalte zu verhindern.
                </p>
                <p className="mb-4">
                    Der Verein erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf
                    den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder
                    die Urheberschaft der verlinkten/verknüpften Seiten hat der Verein keinerlei Einfluss. Deshalb distanziert
                    er sich hiermit ausdrücklich von allen Inhalten aller verlinkten/verknüpften Seiten, die nach der Linksetzung
                    verändert wurden.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">3. Urheber- und Kennzeichenrecht</h3>
                <p className="mb-4">
                    Alle auf dieser Website veröffentlichten Inhalte (Texte, Bilder, Grafiken, Logos) unterliegen dem deutschen
                    Urheberrecht. Jede vom deutschen Urheberrecht nicht zugelassene Verwertung bedarf vorheriger schriftlicher
                    Zustimmung des Vereins.
                </p>
            </section>

            {/* Streitbeilegung */}
            <section>
                <h2 className="mb-4 text-2xl font-extrabold text-alb-900 sm:text-3xl">Streitbeilegung</h2>
                <p className="mb-4">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a
                        href="https://ec.europa.eu/consumers/odr"
                        className="text-brand-600 hover:underline ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://ec.europa.eu/consumers/odr
                    </a>
                </p>
                <p>
                    Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            {/* Werbung für mich */}
            <div className="mt-12 border-t border-slate-200 py-4 text-sm text-slate-500">
                <p>Diese Webseite wurde von Samuel Meßmer Designed und selbstständig programmiert. </p>
                <Link
                    href={"https://github.com/samuelmessmer"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                >
                    Mein GitHub-Profil für mehr Informationen:
                    <FaGithub size={25} className="hover:scale-125 duration-250" />
                </Link>
            </div>

            {/* Aktualitätshinweis */}
            <div className="border-t border-slate-200 pt-4 text-sm text-slate-500">
                <p>Dieses Impressum wurde zuletzt aktualisiert am 01. Januar 2024</p>
            </div>
            </div>
        </div>
    );
}

export default Impressum;