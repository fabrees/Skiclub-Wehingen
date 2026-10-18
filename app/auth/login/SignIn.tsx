'use client';

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormValues = {
    username: string;
    password: string;
}

export default function SignIn() {
    const SUCCESS_MESSAGE = "Login erfolgreich!"

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
            username: data.username,
            password: data.password,
            callbackUrl,
        });

        if (res?.error) {
            setError("Login fehlgeschlagen - Bitte überprüfen Sie Ihre Anmeldedaten");
        } else if (res?.url) {
            setSuccess(true);
            router.push(res.url);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* HEADER */}
            <section>
                <div className="flex flex-col items-center mt-20 mb-12 sm:mb-20">
                    <h1 className="self-start sm:self-center ml-2 font-extrabold text-[52px] sm:text-8xl sm1 xl:text-9xl tracking-tighter mb-0 sm:mb-4 z-10">
                        Admin Login
                    </h1>
                    <p className="text-brand-500 text-lg sm:text-2xl mx-4 md:self-center md:mx-12 sm:text-center">
                        Bitte melden Sie sich mit Ihren Administrator-Zugangsdaten an
                    </p>
                </div>
            </section>

            {/* LOGIN-FORMULAR */}
            <section>
                <div className="flex flex-col sticky top-24 md:mx-40">
                    <Card className="mb-5 md:mb-24 mx-4 md:mx-14 flex flex-col items-center md:items-center animate-zoom zoom shadow-xl bg-alb-50">
                        <div className="w-full">
                            <CardHeader className="font-bold text-3xl lg:text-5xl -ml-2 mb-4 mt-12">
                                Anmeldedaten eingeben:
                            </CardHeader>
                            <CardContent className="text-lg">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mb-10"
                                >
                                    <div className="mb-4">
                                        <label className="block font-semibold text-lg mb-2">
                                            Benutzername:
                                        </label>
                                        <input
                                            {...register("username", {
                                                required: "Bitte geben Sie einen Benutzernamen an",
                                                minLength: {
                                                    value: 2,
                                                    message: "Bitte geben Sie einen gültigen Benutzernamen an"
                                                }
                                            })}
                                            type="text"
                                            placeholder="Ihr Benutzername"
                                            className={`p-2 border border-brand-100 rounded-xl w-full ${errors.username && "border-2 border-red-500"}`}
                                        />
                                        {errors.username && (
                                            <p className="font-light text-xs text-red-500">{`${errors.username?.message}`}</p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block font-semibold text-lg mb-2">
                                            Passwort:
                                        </label>

                                        <div className="relative">
                                            <input
                                                {...register("password", {
                                                    required: "Bitte geben Sie ein Passwort an",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Das Passwort muss mindestens 6 Zeichen lang sein"
                                                    }
                                                })}
                                                type={`${isPasswordVisible ? "text" : "password"}`}
                                                placeholder="Ihr Passwort"
                                                className={`p-2 border border-brand-100 rounded-xl w-full ${errors.password && "border-2 border-red-500"}`}
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-3 right-5"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPasswordVisibility(!isPasswordVisible);
                                                }}
                                            >
                                                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="font-light text-xs text-red-500">{`${errors.password?.message}`}</p>
                                        )}
                                    </div>

                                    {(error !== null && !isSubmitting && !success) && (
                                        <p className="text-red-500 mb-4">{error}</p>
                                    )}
                                    {(success && (
                                        <p className="text-green-500 mb-4">{SUCCESS_MESSAGE}</p>
                                    ))}

                                    <button
                                        type="submit"
                                        className="bg-brand-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-brand-600 w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Anmeldung läuft..." : "Anmelden"}
                                    </button>
                                </form>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
