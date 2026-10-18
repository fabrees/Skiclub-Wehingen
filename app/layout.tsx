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
  title: "Skiclub Wehingen Fossiliuslauf Homepage",
  description: "Alle Informationen über den Skiclub Wehingen und den Fossiliuslauf, so wie die neusten Aktivitäten",
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
