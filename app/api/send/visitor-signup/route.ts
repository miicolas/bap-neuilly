import SalonInvitationEmail from "@/components/emails/visitor-signup";
import { GetEventDetailsAction } from "@/action/(visitor)/event-details/action";
import { FormResponse } from "@/lib/type";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

    try {
        const { firstName, lastName, email, person, ticketNumber, isPro } =
            await req.json();

        const eventDetails = await GetEventDetailsAction() as FormResponse<{
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
            subject: `Salon des créateurs d'objects et artisans de Neuilly - Confirmation d'inscription`,
            react: SalonInvitationEmail({
                firstName: firstName,
                lastName: lastName,
                eventDate: eventDetails.content.dayEvent[0],
                eventName:
                    "Salon des créateurs d'objects et artisans de Neuilly",
                numberOfGuests: person,
                eventLocation: eventDetails.content.localisation[0],
                ticketNumber: ticketNumber,
                isPro: isPro,
            }),
        });

        if (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }

}
