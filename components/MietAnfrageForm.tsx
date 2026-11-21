"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BelegungsKalender, { useVerfuegbarkeit, Zeitraum } from "@/components/BelegungsKalender";
import { formatZeitraum } from "@/lib/datum";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    website: string;
    zeitraum: Zeitraum;
}

const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
        hasError ? "border-red-500" : "border-slate-300"
    }`;

const FehlerText = ({ text }: { text?: string }) =>
    text ? <p className="mt-1 text-sm text-red-600">{text}</p> : null;

const MietAnfrageForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<FormValues>({ defaultValues: { zeitraum: null } });

    const verfuegbarkeit = useVerfuegbarkeit();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async ({ zeitraum, ...data }: FormValues) => {
        setError(null);
        if (!zeitraum) return;
        try {
            const response = await fetch("/api/emails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, von: zeitraum.von, bis: zeitraum.bis })
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                setError(result?.error ?? "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.");
                // Zeitraum wurde inzwischen belegt: Kalender neu laden
                if (response.status === 409) {
                    setValue("zeitraum", null);
                    verfuegbarkeit.laden();
                }
                return;
            }
        } catch {
            setError("Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
            return;
        }

        setSuccess(formatZeitraum(zeitraum.von, zeitraum.bis));
        reset();
        verfuegbarkeit.laden();
    }

    if (success) {
        return (
            <div className="rounded-2xl bg-tanne-50 p-6">
                <p className="text-lg font-bold text-alb-900">Vielen Dank – Ihre Nachricht wurde gesendet!</p>
                <p className="mt-2">
                    Der Zeitraum {success} ist für Sie vorläufig vorgemerkt. Unser Hüttenwart meldet sich bei Ihnen.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            action={""} //safari auto fill umgehen
            className="space-y-5"
        >
            <fieldset>
                <legend className="mb-2 block font-semibold text-alb-900">Zeitraum</legend>
                {verfuegbarkeit.daten ? (
                    <Controller
                        name="zeitraum"
                        control={control}
                        rules={{ validate: (z) => (z ? true : "Bitte wählen Sie einen Zeitraum im Kalender") }}
                        render={({ field }) => (
                            <BelegungsKalender
                                verfuegbarkeit={verfuegbarkeit.daten!}
                                wert={field.value}
                                onChange={field.onChange}
                                hatFehler={!!errors.zeitraum}
                            />
                        )}
                    />
                ) : verfuegbarkeit.fehler ? (
                    <p className="rounded-xl bg-red-50 p-4 text-red-700">
                        Der Belegungskalender konnte nicht geladen werden.{" "}
                        <button type="button" onClick={verfuegbarkeit.laden} className="font-semibold underline">
                            Erneut versuchen
                        </button>
                    </p>
                ) : (
                    <div className="h-80 animate-pulse rounded-2xl bg-slate-100" aria-label="Kalender wird geladen" />
                )}
                <FehlerText text={errors.zeitraum?.message} />
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className="mb-2 block font-semibold text-alb-900">Vorname</label>
                    <input
                        id="firstName"
                        {...register("firstName", {
                            required: "Bitte geben Sie einen Vornamen an",
                            minLength: {
                                value: 2,
                                message: "Bitte geben Sie einen gültigen Vornamen an"
                            }
                        })}
                        type="text"
                        placeholder="Ihr Vorname"
                        className={inputClass(!!errors.firstName)}
                    />
                    <FehlerText text={errors.firstName?.message} />
                </div>
                <div>
                    <label htmlFor="lastName" className="mb-2 block font-semibold text-alb-900">Nachname</label>
                    <input
                        id="lastName"
                        {...register("lastName", {
                            required: "Bitte geben Sie einen Nachnamen an",
                            minLength: {
                                value: 2,
                                message: "Bitte geben Sie einen gültigen Nachnamen an",
                            }
                        })}
                        type="text"
                        placeholder="Ihr Nachname"
                        className={inputClass(!!errors.lastName)}
                    />
                    <FehlerText text={errors.lastName?.message} />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block font-semibold text-alb-900">E-Mail</label>
                <input
                    id="email"
                    {...register("email", {
                        required: "Bitte geben Sie eine E-Mail an",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Bitte geben Sie eine gültige E-Mail an"
                        }
                    })}
                    type="email"
                    placeholder="Ihre E-Mail"
                    className={inputClass(!!errors.email)}
                />
                <FehlerText text={errors.email?.message} />
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block font-semibold text-alb-900">Nachricht</label>
                <textarea
                    id="message"
                    {...register("message", {
                        required: "Bitte geben Sie eine Nachricht ein",
                        minLength: {
                            value: 5,
                            message: "Bitte geben Sie eine gültige Nachricht ein (min. 5 Zeichen)"
                        }
                    })}
                    placeholder="Wofür möchten Sie die Skihütte nutzen und mit wie vielen Personen?"
                    className={`${inputClass(!!errors.message)} h-48`}
                />
                <FehlerText text={errors.message?.message} />
            </div>

            {/* Honeypot gegen Spam-Bots, für Besucher unsichtbar */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {error && (
                <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-brand-500 px-7 py-3 font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
                {isSubmitting ? "Wird gesendet …" : "Nachricht senden"}
            </button>
        </form>
    );
};

export default MietAnfrageForm;
