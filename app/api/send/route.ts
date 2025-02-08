import { EmailTemplate } from '@/components/emails/test-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email } = await req.json();
    const { data, error } = await resend.emails.send({
      from: 'Acme <bap-neuilly-contact@nicolas-becharat.com>', // TODO: change this
      to: ['nicolas.becharat@gmail.com'],
      subject: 'Hello world',
      react: await EmailTemplate({ firstName: `${firstName} ${lastName}` }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
