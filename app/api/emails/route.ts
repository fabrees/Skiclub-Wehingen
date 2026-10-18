import { RentingInfo } from "@/components/emails/RentingInfo";
import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Erst zur Laufzeit erzeugen, damit der Build ohne RESEND_API_KEY funktioniert
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const { error, data } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["samuel.messmer@web.de"],
        subject: "Neue Mietanfrage auf der Skiclub Website!",
        react: RentingInfo(
            body.firstName,
            body.lastName,
            body.email,
            body.message
        ),
    });

    if (error)
        return NextResponse.json(
            { "Internal server error: ": error },
            { status: 500 }
        );

    return NextResponse.json({ "Success, data: ": data }, { status: 200 });
}
