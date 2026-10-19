import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/lib/client";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";
import {
  belegendeBuchungen,
  buchungAlsJson,
  ladeEinstellungen,
  ueberschneidung,
} from "@/lib/buchungen";
import { dateAusTag, istGueltigerTag } from "@/lib/datum";
import { neueBuchungSchema } from "./schema";

export const dynamic = "force-dynamic";

// Alle Buchungen, optional auf einen Zeitraum begrenzt (?von=…&bis=…)
export async function GET(req: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  const von = req.nextUrl.searchParams.get("von");
  const bis = req.nextUrl.searchParams.get("bis");
  const where = von && bis && istGueltigerTag(von) && istGueltigerTag(bis) ? ueberschneidung(von, bis) : {};

  const buchungen = await prisma.buchung.findMany({ where, orderBy: { von: "asc" } });
  return NextResponse.json(buchungen.map(buchungAlsJson));
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  const parsed = neueBuchungSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? "Ungültige Eingabe" }, { status: 400 });
  }
  const { von, bis, status, ...rest } = parsed.data;

  const konflikt = await prisma.buchung.findFirst({
    where: { AND: [belegendeBuchungen(), ueberschneidung(von, bis)] },
  });
  if (konflikt) {
    return NextResponse.json(
      { error: `Der Zeitraum überschneidet sich mit „${konflikt.titel}“.` },
      { status: 409 }
    );
  }

  const einstellungen = await ladeEinstellungen();
  const buchung = await prisma.buchung.create({
    data: {
      ...rest,
      von: dateAusTag(von),
      bis: dateAusTag(bis),
      status,
      geblocktBis:
        status === "ANFRAGE"
          ? new Date(Date.now() + einstellungen.anfrageSperreStunden * 3600 * 1000)
          : null,
    },
  });
  return NextResponse.json(buchungAlsJson(buchung), { status: 201 });
}
