import { NextResponse } from "next/server";
import { belegteTage, buchbarerZeitraum, ladeEinstellungen, oeffentlicheTermine } from "@/lib/buchungen";

export const dynamic = "force-dynamic";

// Öffentlich: nur frei/belegt, Text nur bei öffentlichen Terminen
export async function GET() {
  try {
    const einstellungen = await ladeEinstellungen();
    const { ersterTag, letzterTag } = buchbarerZeitraum(einstellungen);
    const [belegt, termine] = await Promise.all([
      belegteTage(ersterTag, letzterTag),
      oeffentlicheTermine(ersterTag, letzterTag),
    ]);
    return NextResponse.json({
      ersterTag,
      letzterTag,
      belegt,
      termine,
      sperreStunden: einstellungen.anfrageSperreStunden,
    });
  } catch (err) {
    console.error("Verfügbarkeit: Laden fehlgeschlagen", err);
    return NextResponse.json({ error: "Belegung konnte nicht geladen werden." }, { status: 500 });
  }
}
