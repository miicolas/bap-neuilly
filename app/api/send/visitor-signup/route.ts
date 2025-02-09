import  SalonInvitationEmail  from '@/components/emails/visitor-signup';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, person, ticketNumber } = await req.json();
    const { data, error } = await resend.emails.send({
      from: "Salon des créateurs d'objects et artisans de Neuilly <bap-neuilly-contact@nicolas-becharat.com>",
      replyTo: 'bap-neuilly-contact@nicolas-becharat.com',
      headers: {
        'Reply-To': 'bap-neuilly-contact@nicolas-becharat.com',
        'Return-Path': 'bap-neuilly-contact@nicolas-becharat.com',
      },
      to: [`${email}`],
      subject: `Salon des créateurs d'objects et artisans de Neuilly - Confirmation d'inscription`,
      react: SalonInvitationEmail({
        firstName: firstName,
        lastName: lastName,
        eventDate: '15 mars 2025',
        eventName: "Salon des créateurs d'objects et artisans de Neuilly",
        numberOfGuests: person,
        eventLocation: 'Paris Expo Porte de Versailles',
        ticketNumber: ticketNumber,
        pdfLink: 'https://salon-mariage.com/tickets/SALON-2025-1234.pdf',
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
