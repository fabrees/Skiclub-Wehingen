'use client';

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormValues = {
    password: string;
}

export default function SignIn() {
    const SUCCESS_MESSAGE = "Angemeldet"

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const onSubmit = async (data: FormValues) => {
        const res = await signIn("credentials", {
            redirect: false,
            password: data.password,
            callbackUrl,
        });

        if (res?.error) {
            setError("Falsches Passwort");
        } else if (res?.url) {
            setSuccess(true);
            router.push(res.url);
        }
    };

    return (
        <div className="bg-white min-h-[70vh] flex items-center justify-center px-4 py-20">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm"
            >
                <h1 className="font-extrabold text-4xl tracking-tight text-center mb-8">
                    Interner Bereich
                </h1>

                <div className="relative">
                    <input
                        {...register("password", {
                            required: "Bitte Passwort eingeben",
                            minLength: {
                                value: 8,
                                message: "Mindestens 8 Zeichen"
                            }
                        })}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Passwort"
                        aria-label="Passwort"
                        autoFocus
                        autoComplete="current-password"
                        className={`p-3 pr-12 border border-brand-100 rounded-xl w-full ${errors.password ? "border-2 border-red-500" : ""}`}
                    />
                    <button
                        type="button"
                        aria-label={isPasswordVisible ? "Passwort verbergen" : "Passwort anzeigen"}
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-brand-500"
                        onClick={() => setPasswordVisibility(!isPasswordVisible)}
                    >
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

                <div className="min-h-6 mt-2 mb-2 text-sm">
                    {errors.password ? (
                        <p className="text-red-500">{`${errors.password.message}`}</p>
                    ) : success ? (
                        <p className="text-green-600">{SUCCESS_MESSAGE}</p>
                    ) : (error && !isSubmitting) ? (
                        <p className="text-red-500">{error}</p>
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="bg-brand-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-brand-600 w-full disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Anmeldung läuft …" : "Anmelden"}
                </button>
            </form>
        </div>
    );
}
