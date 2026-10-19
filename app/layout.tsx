import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  // Basis für absolute Bild-URLs in der Link-Vorschau
  metadataBase: new URL("https://sc-wehingen.de"),
  title: "Skiclub Wehingen e.V. – Skilift, Fossiliuslauf, MTB-Trail",
  description:
    "Skiclub Wehingen e.V. auf dem Heuberg: Skilift, Langlaufloipe, Skihütte, Fossiliuslauf und MTB-Trail – alle Infos und Neuigkeiten.",
  // Vorschau beim Teilen von Links (WhatsApp, Facebook, …). Titel und
  // Beschreibung kommen aus den Metadaten der jeweiligen Seite.
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Skiclub Wehingen e.V.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skihütte des Skiclubs Wehingen im Schnee mit Vereinslogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      </head>
      <body
        className={`${nunito.variable} antialiased overflow-x-hidden`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
