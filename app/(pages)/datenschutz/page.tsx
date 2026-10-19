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

            {/* Abschnitt 3: Hosting und Server-Logfiles */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">3. Hosting und Server-Logfiles</h2>
                <p className="mb-4">
                    Diese Website wird auf einem virtuellen Server der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, betrieben,
                    mit der wir einen Auftragsverarbeitungsvertrag geschlossen haben (Art. 28 DSGVO). Bei jedem Aufruf speichert
                    der Webserver automatisch folgende Daten in Server-Logfiles:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>IP-Adresse</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>aufgerufene Seite, Statuscode und übertragene Datenmenge</li>
                    <li>Referrer-URL</li>
                    <li>verwendeter Browser und Betriebssystem</li>
                </ul>
                <p className="mb-4">
                    Die Verarbeitung dient dem sicheren und stabilen Betrieb der Website, etwa zur Abwehr von Angriffen und zur
                    Fehleranalyse (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach 14 Tagen automatisch
                    gelöscht.
                </p>
            </section>

            {/* Abschnitt 4: Cookies */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">4. Cookies</h2>
                <p className="mb-4">
                    Für Besucherinnen und Besucher unserer Website setzen wir keine Cookies. Lediglich bei der Anmeldung im
                    internen Verwaltungsbereich wird ein technisch notwendiges Sitzungs-Cookie gesetzt, das die Anmeldung
                    aufrechterhält (Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG, Art. 6 Abs. 1 lit. f DSGVO). Dieses Cookie betrifft
                    nur berechtigte Vereinsmitglieder.
                </p>
            </section>

            {/* Abschnitt 5: Kontaktaufnahme und Mietanfrage */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">5. Kontaktaufnahme und Mietanfrage</h2>
                <p className="mb-4">
                    Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage.
                </p>
                <p className="mb-4">
                    Wenn Sie über das Formular auf der Seite „Mieten“ eine Anfrage stellen, verarbeiten wir Vorname, Nachname,
                    E-Mail-Adresse und Ihre Nachricht, um die Anfrage zu beantworten und ggf. einen Mietvertrag anzubahnen
                    (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO). Die Anfrage wird per E-Mail an die zuständigen Vereinsmitglieder
                    weitergeleitet. Für den Versand nutzen wir den E-Mail-Dienst der IONOS SE, Montabaur. Zum Schutz vor
                    Missbrauch wird Ihre IP-Adresse für bis zu 10 Minuten im Arbeitsspeicher des Servers vorgehalten
                    (Art. 6 Abs. 1 lit. f DSGVO). Eine Weitergabe an sonstige Dritte erfolgt nicht.
                </p>
            </section>

            {/* Abschnitt 6: Google Maps */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">6. Google Maps</h2>
                <p className="mb-4">
                    Auf der Seite zum Fossiliuslauf können Sie eine Karte von Google Maps anzeigen. Die Karte wird erst geladen,
                    wenn Sie auf „Google Maps laden“ klicken. Erst dann werden Daten, insbesondere Ihre IP-Adresse, an Google
                    übertragen. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Eine
                    Übermittlung in die USA ist möglich; Google ist unter dem EU-US Data Privacy Framework zertifiziert.
                </p>
                <p className="mb-4">
                    Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Die
                    Einwilligung gilt nur für den jeweiligen Seitenaufruf. Nach dem Neuladen der Seite wird die Karte nicht mehr
                    automatisch geladen. Weitere Informationen:{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        className="text-brand-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://policies.google.com/privacy
                    </a>
                </p>
            </section>

            {/* Abschnitt 7: Hochgeladene Bilder */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">7. Speicherung hochgeladener Bilder</h2>
                <p className="mb-4">
                    Bilder, die der Verein für Beiträge hochlädt, speichern wir bei Amazon Web Services (Amazon Web Services EMEA
                    SARL, Luxemburg) in einem Rechenzentrum in Stockholm (EU). Die Auslieferung an Besucherinnen und Besucher
                    erfolgt über unseren eigenen Server; dabei werden keine Daten von Ihnen an AWS übermittelt.
                </p>
            </section>

            {/* Abschnitt 8: Externe Links */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">8. Links zu externen Angeboten</h2>
                <p className="mb-4">
                    Unsere Website enthält Links zu externen Angeboten, z. B. zu unserem WhatsApp-Kanal, zu Instagram, zu
                    raceresult (Ergebnisse und Anmeldung) und zu skiwanderwege-heuberg.de. Es handelt sich um einfache Links, die
                    Inhalte werden nicht eingebettet. Erst wenn Sie einen Link anklicken, werden Daten an den jeweiligen Anbieter
                    übertragen. Dafür gilt dessen Datenschutzerklärung.
                </p>
            </section>

            {/* Abschnitt 9: Speicherdauer */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">9. Speicherdauer</h2>
                <p className="mb-4">
                    Personenbezogene Daten werden nur so lange gespeichert, wie es für den Verarbeitungszweck erforderlich ist
                    oder gesetzliche Aufbewahrungsfristen (z.B. steuerrechtliche 10 Jahre) dies vorschreiben.
                </p>
            </section>

            {/* Abschnitt 10: Betroffenenrechte */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">10. Ihre Rechte</h2>

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

                <h3 className="mb-2 mt-6 text-xl font-bold text-alb-900">f) Widerruf einer Einwilligung</h3>
                <p className="mb-4">
                    Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der
                    bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                </p>
            </section>

            {/* Abschnitt 11: Aktualisierungen */}
            <section>
                <h2 className="mb-4 mt-12 text-2xl font-extrabold text-alb-900 sm:text-3xl">11. Aktualität der Datenschutzerklärung</h2>
                <p className="mb-4">
                    Diese Datenschutzerklärung wird bei wesentlichen Änderungen aktualisiert. Die jeweils aktuelle Version finden
                    Sie stets auf dieser Seite.
                </p>
                <p className="text-sm text-slate-500">
                    Stand: Oktober 2026
                </p>
            </section>

            {/* Kontaktmöglichkeit */}
            <section className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="mb-4 text-xl font-bold text-alb-900">Fragen zum Datenschutz</h2>
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