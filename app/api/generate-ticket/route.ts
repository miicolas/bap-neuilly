import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    // Créer les données du billet
    const ticket = {
      id: requestData.ticketNumber,
      name: `${requestData.firstName} ${requestData.lastName}`,
      eventDate: requestData.eventDate ?? new Date().toLocaleDateString(),
      eventName: "Salon des créateurs de Neuilly-sur-Seine",
      eventLocation: "Théâtre des Sablons",
    };

    // Générer QR Code
    const qrCodeDataURL = await QRCode.toDataURL(`url/${ticket.id}`);

    // Lancer Puppeteer pour créer le PDF
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(),
    });
    const page = await browser.newPage();

    // Modèle HTML du billet
    const htmlContent = `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 20px;
                  background: white;
                  color: black;
                  margin: 0;
              }

              .ticket-container {
                  width: 600px;
                  margin: auto;
                  border: 2px solid black;
                  padding: 20px;
                  text-align: left;
                  display: flex;
                  flex-direction: column;
              }

              .event-title {
                  font-size: 22px;
                  font-weight: bold;
                  text-transform: uppercase;
                  background: black;
                  color: white;
                  text-align: center;
                  padding: 10px;
              }

              .ticket-info {
                  font-size: 18px;
                  padding: 15px;
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 2px solid black;
              }

              .qr-code {
                  text-align: center;
                  padding: 20px 0;
                  border-bottom: 2px solid black;
              }

              .location {
                  font-size: 16px;
                  padding: 15px;
                  border-bottom: 2px solid black;
              }

              .footer {
                  text-align: center;
                  font-size: 14px;
                  padding-top: 10px;
                  color: #555;
              }
          </style>
      </head>
      <body>
          <div class="ticket-container">
              <div class="event-title">Salon des créateurs de Neuilly-sur-Seine</div>

              <div class="ticket-info">
                  <div><strong>Nom:</strong> ${ticket.name}</div>
                  <div><strong>ID:</strong> ${ticket.id}</div>
              </div>
              <div class="ticket-info">
                  <div><strong>Date:</strong> ${ticket.eventDate}</div>
              </div>

              <div class="qr-code">
                  <img src="${qrCodeDataURL}" width="200" height="200"/>
              </div>

              <div class="location">
                  <p><strong>Lieu:</strong> Théâtre des Sablons</p>
                  <p><strong>Adresse:</strong> 70 Av. du Roule, Neuilly-sur-Seine</p>
              </div>

              <div class="footer">Merci de présenter ce billet à l'entrée.</div>
          </div>
      </body>
      </html>

    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Convertir en Base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    return new Response(JSON.stringify({ pdfBase64 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du billet :", error);
    return NextResponse.json(
      { error: "Échec de la génération du billet" },
      { status: 500 }
    );
  }
}
