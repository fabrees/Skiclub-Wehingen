"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface LinkData {
    id: number;
    name: string;
    document: string;
}

export default function LaufListe() {
    const [links, setLinks] = useState<LinkData[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                // const response = await fetch("/api/link");
                // const data = await response.json();

                const response = await fetch("/api/link", { cache: "no-store" });
                const data = await response.json();
                console.log("API Response:", JSON.stringify(data));
                setLinks(data);

                console.log("API REsponse: " + data)
                setLinks(data);
            } catch (error) {
                console.error("Fehler beim Laden der Links:", error);
            }
        };

        fetchLinks();
    }, []);

    const laufEvents = [
        "Hauptlauf",
        "Jedermannlauf",
        "Nordic-Walker",
        "Schülerlauf",
        "Kidslauf",
        "Bambinilauf",
    ];

    return (
        <div className="flex flex-col gap-5 sm:w-[600px] lg:w-[850px] bg-brand-500 p-8 mx-2 sm:m-12 rounded-md shadow-xl mb-12 w-full">
            {laufEvents.map((event, index) => {
                //+1, weil ich die Daten in der Datenbank etwas
                // umständlich gespeichert habe und der Mitgliedsantrag
                // an Index 1 gespeichert ist.
                const linkItem = links[index + 1];
                return (
                    <div key={event} className="mb-5">
                        <div className="flex justify-between mb-2">
                            <h3 className="sm:font-semibold text-2xl lg:text-2xl -ml-2">
                                {event}
                            </h3>
                            <Link
                                href={linkItem?.document ?? "#"} // Fallback # Blank if document didnt load
                                target={linkItem?.document ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="bg-white py-1 px-2 rounded-sm w-fit shadow-md font-semibold hover:scale-105 duration-150"
                            >
                                <p className="block sm:hidden">Link</p>
                                <p className="hidden sm:block">Link zum Download</p>
                            </Link>
                        </div>
                        <div className="border-solid border-small border-y-1 border-gray-300 rounded-xl"></div>
                    </div>
                );
            })}
        </div>
    );
}
