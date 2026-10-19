import { z } from "zod";
import { istGueltigerTag } from "@/lib/datum";

const tag = z.string().refine(istGueltigerTag, "Ungültiges Datum");

const felder = {
  von: tag,
  bis: tag,
  titel: z.string().trim().min(1, "Bitte einen Text eingeben").max(200),
  status: z.enum(["ANFRAGE", "BESTAETIGT"]),
  name: z.string().trim().max(200).nullish(),
  email: z.string().trim().max(200).nullish(),
  nachricht: z.string().trim().max(5000).nullish(),
};

const zeitraumOk = (d: { von?: string; bis?: string }) => !d.von || !d.bis || d.von <= d.bis;
const zeitraumFehler = { message: "Das Ende darf nicht vor dem Beginn liegen", path: ["bis"] };

export const neueBuchungSchema = z
  .object({ ...felder, status: felder.status.default("BESTAETIGT") })
  .refine(zeitraumOk, zeitraumFehler);

export const buchungAendernSchema = z
  .object(felder)
  .partial()
  .extend({
    // Sperrfrist einer Anfrage um die eingestellte Zeit verlängern
    sperreVerlaengern: z.boolean().optional(),
  })
  .refine(zeitraumOk, zeitraumFehler);
