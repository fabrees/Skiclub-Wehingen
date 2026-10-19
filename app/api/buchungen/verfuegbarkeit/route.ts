import { NextResponse } from "next/server";
import { belegteTage, buchbarerZeitraum, ladeEinstellungen } from "@/lib/buchungen";

export const dynamic = "force-dynamic";

// Öffentlich: nur frei/belegt, keine Details zu den Buchungen
export async function GET() {
  try {
    const einstellungen = await ladeEinstellungen();
    const { ersterTag, letzterTag } = buchbarerZeitraum(einstellungen);
    const belegt = await belegteTage(ersterTag, letzterTag);
    return NextResponse.json({
      ersterTag,
      letzterTag,
      belegt,
      sperreStunden: einstellungen.anfrageSperreStunden,
    });
  } catch (err) {
    console.error("Verfügbarkeit: Laden fehlgeschlagen", err);
    return NextResponse.json({ error: "Belegung konnte nicht geladen werden." }, { status: 500 });
  }
}
