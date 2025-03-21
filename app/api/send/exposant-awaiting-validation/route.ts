import ExposantAwaitingValidationEmail from "@/components/emails/exposant-awaiting-validation";
import { Resend } from "resend";
import { GetEventDetailsAction } from "@/action/(visitor)/event-details/action";
import { FormResponse } from "@/lib/type";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const {
            firstName,
            lastName,
            email,
            companyName,
            siret,
            adresse,
            city,
            postalCode,
            exposantId,
        } = await req.json();

        const eventDetails = (await GetEventDetailsAction()) as FormResponse<{
            dayEvent: string[];
            localisation: string[];
        }>;

        if (!eventDetails.content) {
            throw new Error("Event details not found");
        }
        const { data, error } = await resend.emails.send({
            from: "Salon des créateurs d'objects et artisans de Neuilly <bap-neuilly-contact@nicolas-becharat.com>",
            replyTo: "bap-neuilly-contact@nicolas-becharat.com",
            headers: {
                "Reply-To": "bap-neuilly-contact@nicolas-becharat.com",
                "Return-Path": "bap-neuilly-contact@nicolas-becharat.com",
            },
            to: [`${email}`],
            subject: `Salon des créateurs d'objects et artisans de Neuilly - Attente de validation d'inscription`,
            react: ExposantAwaitingValidationEmail({
                firstName,
                lastName,
                companyName,
                eventDate: eventDetails.content.dayEvent[0],
                eventName:
                    "Salon des créateurs d'objects et artisans de Neuilly",
                eventLocation: eventDetails.content.localisation[0],
                siret,
                adresse,
                city,
                postalCode,
                exposantId,
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
