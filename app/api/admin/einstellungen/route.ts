import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";
import { EINSTELLUNG_GRENZEN, ladeEinstellungen, speichereEinstellungen } from "@/lib/buchungen";

export const dynamic = "force-dynamic";

const zahl = (k: keyof typeof EINSTELLUNG_GRENZEN) =>
  z.number().int().min(EINSTELLUNG_GRENZEN[k].min).max(EINSTELLUNG_GRENZEN[k].max);

const schema = z
  .object({
    buchungshorizontTage: zahl("buchungshorizontTage"),
    anfrageSperreStunden: zahl("anfrageSperreStunden"),
  })
  .partial();

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  return NextResponse.json({
    ...(await ladeEinstellungen()),
    // Abo-Link mit Details nur, wenn ein Token konfiguriert ist
    icsTokenGesetzt: Boolean(process.env.KALENDER_ICS_TOKEN),
    icsToken: process.env.KALENDER_ICS_TOKEN ?? null,
  });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte gültige Werte eingeben." }, { status: 400 });
  }
  await speichereEinstellungen(parsed.data);
  return NextResponse.json(await ladeEinstellungen());
}
