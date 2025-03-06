import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    // Valeurs par défaut
    const ticketData = {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      email: requestData.email,
      ticketNumber: requestData.ticketNumber,
      eventDate: requestData.eventDate ?? new Date().toLocaleDateString(),
    };

    // Billet PDF
    const ticketResponse = await fetch("http://localhost:3000/api/generate-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (!ticketResponse.ok) {
      throw new Error("Erreur lors de la génération du billet PDF.");
    }

    // Extraire la réponse JSON contenant le PDF encodé en Base64
    const { pdfBase64 } = await ticketResponse.json();
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Contenu HTML de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Confirmation d'inscription - Salon des créateurs de Neuilly-sur-Seine</h2>
          <p>Bonjour <strong>${ticketData.firstName}</strong>,</p>
          <p>Merci de votre inscription au <strong>Salon des créateurs de Neuilly-sur-Seine</strong>. Vous trouverez en pièce jointe votre billet d'entrée.</p>
          <hr style="border: 1px solid #ddd;">
          <p><strong>Numéro de billet:</strong> ${ticketData.ticketNumber}</p>
          <p><strong>Date:</strong> ${ticketData.eventDate}</p>
          <p><strong>Lieu:</strong> Théâtre des Sablons</p>
          <hr style="border: 1px solid #ddd;">
          <p>Merci et à bientôt !</p>
      </div>
    `;

    // Envoyer l'email avec le billet en pièce jointe
    const { data, error } = await resend.emails.send({
      from: "Salon des créateurs <bap-neuilly-contact@nicolas-becharat.com>",
      to: [ticketData.email],
      subject: `Salon des créateurs - Votre billet`,
      html: emailHtml, 
      attachments: [
        {
          filename: `billet-salon-créateurs-neuilly.pdf`,
          content: pdfBuffer.toString("base64"),
          contentType: "application/pdf",
        },
      ],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Billet envoyé avec succès", data });

  } catch (error) {
    console.error("Erreur lors de l'envoi du billet :", error);
    return NextResponse.json({ error: "Échec de l'envoi du billet" }, { status: 500 });
  }
}
