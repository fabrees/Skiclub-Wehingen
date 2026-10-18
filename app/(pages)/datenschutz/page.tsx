import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Datenschutz – Skiclub Wehingen",
};


const Datenschutz = () => {
    return (
        <div>
            <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />
            <div className="mx-auto max-w-3xl px-4 py-16 text-lg leading-relaxed sm:px-6 sm:py-20">

            <section>
                <p className="mb-4">
                    Wir freuen uns sehr über Ihr Interesse an unserem Verein. Datenschutz hat einen hohen Stellenwert für den
                    Skiclub Wehingen. Eine Nutzung unserer Internetseite ist grundsätzlich ohne die Angabe personenbezogener Daten
                    möglich. Sollten Sie besondere Services unseres Vereins über unsere Internetseite in Anspruch nehmen, könnte
                    jedoch eine Verarbeitung personenbezogener Daten erforderlich werden.
                </p>
            </section>

            {/* Abschnitt 1: Begriffsbestimmungen */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">1. Begriffsbestimmungen</h2>
                <p className="mb-4">
                    Unsere Datenschutzerklärung beruht auf den Begrifflichkeiten der Datenschutz-Grundverordnung (DSGVO). Sie soll
                    für alle verständlich sein.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">a) Personenbezogene Daten</h3>
                <p className="mb-4">
                    Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
                    natürliche Person beziehen, z. B. Name, Adresse oder E-Mail.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">b) Verarbeitung</h3>
                <p className="mb-4">
                    Verarbeitung ist jeder Vorgang im Zusammenhang mit personenbezogenen Daten, z. B. Erhebung, Speicherung oder
                    Nutzung.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">c) Verantwortlicher</h3>
                <p className="mb-4">
                    Verantwortlicher ist die natürliche oder juristische Person, die über die Zwecke und Mittel der Verarbeitung von
                    personenbezogenen Daten entscheidet. Verantwortlich für diese Seite:
                </p>
                <div className="mb-4 rounded-2xl bg-alb-50 p-6">
                    <p className="font-semibold">Skiclub Wehingen e.V.</p>
                    <p>1. Vorsitzender: Gerd Linse</p>
                    <p>Vorstadtstraße 14</p>
                    <p>78564 Wehingen</p>
                    <p className="mt-3">
                        E-Mail: <a href="mailto:vorstand@sc-wehingen.de" className="text-brand-600 hover:underline">vorstand@sc-wehingen.de</a>
                    </p>
                </div>
            </section>

            {/* Abschnitt 2: Datenschutzmaßnahmen */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">2. Technische und organisatorische Maßnahmen</h2>
                <p className="mb-4">
                    Der Skiclub Wehingen hat technische und organisatorische Maßnahmen umgesetzt, um den bestmöglichen Schutz der
                    über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch kann ein absoluter
                    Schutz nicht gewährleistet werden.
                </p>
            </section>

            {/* Abschnitt 3: Cookies */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">3. Cookies</h2>
                <p className="mb-4">
                    Die Internetseiten des Skiclub Wehingen verwenden Cookies. Cookies sind Textdateien, welche über einen Internetbrowser auf einem
                    Computersystem abgelegt und gespeichert werden.
                </p>
                <p className="mb-4">
                    Durch den Einsatz von Cookies kann der Skiclub Wehingen den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen,
                    die ohne die Cookie-Setzung nicht möglich wären.
                </p>
                <p className="mb-4">
                    Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels entsprechender Einstellung des
                    genutzten Internetbrowsers verhindern. Wird die Setzung von Cookies deaktiviert, sind unter Umständen nicht alle Funktionen unserer
                    Internetseite vollumfänglich nutzbar.
                </p>
            </section>

            {/* Abschnitt 4: Server-Logfiles */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">4. Server-Logfiles</h2>
                <p className="mb-4">
                    Die Internetseite erfasst mit jedem Aufruf eine Reihe von allgemeinen Daten und Informationen. Diese werden in den Logfiles des Servers gespeichert.
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>verwendete Browsertypen und Versionen</li>
                    <li>das verwendete Betriebssystem</li>
                    <li>Referrer-URLs</li>
                    <li>Datum und Uhrzeit eines Zugriffs</li>
                    <li>IP-Adresse (anonymisiert)</li>
                </ul>
                <p className="mb-4">
                    Diese Daten dienen zur sicheren Betriebsgewährleistung und werden nach 7 Tagen gelöscht.
                </p>
            </section>

            {/* Abschnitt 5: Kontaktaufnahme */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">5. Kontaktmöglichkeit</h2>
                <p className="mb-4">
                    Bei Kontaktaufnahme per E-Mail oder Formular werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert.
                    Eine Weitergabe an Dritte erfolgt nicht.
                </p>
            </section>

            {/* Abschnitt 6: Speicherdauer */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">6. Speicherdauer</h2>
                <p className="mb-4">
                    Personenbezogene Daten werden nur so lange gespeichert, wie es für den Verarbeitungszweck erforderlich ist
                    oder gesetzliche Aufbewahrungsfristen (z.B. steuerrechtliche 10 Jahre) dies vorschreiben.
                </p>
            </section>

            {/* Abschnitt 7: Betroffenenrechte */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">7. Ihre Rechte</h2>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">a) Auskunft und Berichtigung</h3>
                <p className="mb-4">
                    Sie haben das Recht auf unentgeltliche Auskunft sowie Berichtigung unrichtiger Daten.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">b) Löschung und Einschränkung</h3>
                <p className="mb-4">
                    Unter bestimmten Voraussetzungen können Sie die Löschung Ihrer Daten verlangen oder die Verarbeitung einschränken.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">c) Datenübertragbarkeit</h3>
                <p className="mb-4">
                    Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">d) Widerspruch</h3>
                <p className="mb-4">
                    Sie können der Verarbeitung aus Gründen Ihrer besonderen Situation widersprechen. Dies gilt insbesondere für
                    Direktwerbung.
                </p>

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">e) Beschwerderecht</h3>
                <p className="mb-4">
                    Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
                    <br />
                    <a
                        href="https://www.baden-wuerttemberg.datenschutz.de/"
                        className="text-brand-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Landesbeauftragter für Datenschutz Baden-Württemberg
                    </a>
                </p>
            </section>

            {/* Abschnitt 8: Aktualisierungen */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">8. Aktualität der Datenschutzerklärung</h2>
                <p className="mb-4">
                    Diese Datenschutzerklärung wird bei wesentlichen Änderungen aktualisiert. Die jeweils aktuelle Version finden
                    Sie stets auf dieser Seite.
                </p>
                <p className="text-sm text-slate-500">
                    Stand: 01. Januar 2024
                </p>
            </section>

            {/* Kontaktmöglichkeit */}
            <section className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="mb-4 text-xl font-bold text-alb-900">Kontakt zum Datenschutzbeauftragten</h2>
                <p>
                    Bei Fragen zum Datenschutz erreichen Sie uns unter:
                    <br />
                    <a
                        href="mailto:datenschutz@sc-wehingen.de"
                        className="text-brand-600 hover:underline"
                    >
                        datenschutz@sc-wehingen.de
                    </a>
                </p>
            </section>
            </div>
        </div>
    );
};

export default Datenschutz;