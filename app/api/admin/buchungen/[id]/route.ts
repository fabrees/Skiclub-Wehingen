import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/lib/client";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";
import {
  belegendeBuchungen,
  buchungAlsJson,
  ladeEinstellungen,
  ueberschneidung,
} from "@/lib/buchungen";
import { dateAusTag, tagAusDate } from "@/lib/datum";
import { buchungAendernSchema } from "../schema";

type Kontext = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Kontext) {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  const id = Number(params.id);
  const bestehend = Number.isInteger(id) ? await prisma.buchung.findUnique({ where: { id } }) : null;
  if (!bestehend) return NextResponse.json({ error: "Buchung nicht gefunden" }, { status: 404 });

  const parsed = buchungAendernSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? "Ungültige Eingabe" }, { status: 400 });
  }
  const { von, bis, status, sperreVerlaengern, ...rest } = parsed.data;

  const neuVon = von ?? tagAusDate(bestehend.von);
  const neuBis = bis ?? tagAusDate(bestehend.bis);
  if (neuVon > neuBis) {
    return NextResponse.json({ error: "Das Ende darf nicht vor dem Beginn liegen" }, { status: 400 });
  }

  const data: Prisma.BuchungUpdateInput = { ...rest, von: dateAusTag(neuVon), bis: dateAusTag(neuBis) };
  const einstellungen = await ladeEinstellungen();
  const neueSperre = () => new Date(Date.now() + einstellungen.anfrageSperreStunden * 3600 * 1000);

  if (status === "BESTAETIGT") data.geblocktBis = null;
  if (status === "ANFRAGE" && bestehend.status !== "ANFRAGE") data.geblocktBis = neueSperre();
  if (status) data.status = status;
  if (sperreVerlaengern && (status ?? bestehend.status) === "ANFRAGE") data.geblocktBis = neueSperre();

  // Wird die Buchung danach den Zeitraum belegen, darf sie sich nicht mit
  // anderen belegenden Buchungen überschneiden
  const wirdBelegen =
    (status ?? bestehend.status) === "BESTAETIGT" ||
    (data.geblocktBis instanceof Date ? data.geblocktBis : bestehend.geblocktBis ?? new Date(0)) > new Date();
  if (wirdBelegen) {
    const konflikt = await prisma.buchung.findFirst({
      where: { AND: [{ id: { not: id } }, belegendeBuchungen(), ueberschneidung(neuVon, neuBis)] },
    });
    if (konflikt) {
      return NextResponse.json(
        { error: `Der Zeitraum überschneidet sich mit „${konflikt.titel}“.` },
        { status: 409 }
      );
    }
  }

  const buchung = await prisma.buchung.update({ where: { id }, data });
  return NextResponse.json(buchungAlsJson(buchung));
}

export async function DELETE(_req: NextRequest, { params }: Kontext) {
  if (!(await isAuthorized())) return NextResponse.json("not Authorized", { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });

  await prisma.buchung.delete({ where: { id } }).catch(() => undefined);
  return NextResponse.json({ ok: true });
}
