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
        <link rel="icon" href="/favicon-skiclub.png" />

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
