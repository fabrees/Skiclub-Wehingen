import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NewsletterListe from "@/components/NewsletterListe";

export const metadata: Metadata = {
  title: "Neuigkeiten – Skiclub Wehingen",
  description: "Aktuelles vom Skiclub Wehingen: Rundmails, Berichte und Einladungen.",
};

const Newsletter = () => (
  <div>
    <PageHeader eyebrow="Newsletter" title="Aktuelles vom Skiclub">
      Hier finden Sie die neuesten Informationen über den Skiclub.
    </PageHeader>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <NewsletterListe />
    </section>
  </div>
);

export default Newsletter;
