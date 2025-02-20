import ExposantAwaitingValidationEmail from '@/components/emails/exposant-awaiting-validation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email } = await req.json();
        const { data, error } = await resend.emails.send({
            from: "Salon des créateurs d'objects et artisans de Neuilly <bap-neuilly-contact@nicolas-becharat.com>",
            replyTo: 'bap-neuilly-contact@nicolas-becharat.com',
            headers: {
                'Reply-To': 'bap-neuilly-contact@nicolas-becharat.com',
                'Return-Path': 'bap-neuilly-contact@nicolas-becharat.com',
            },
            to: [`${email}`],
            subject: `Salon des créateurs d'objects et artisans de Neuilly - Attente de validation d'inscription`,
            react: ExposantAwaitingValidationEmail({
                firstName,
                lastName,
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
