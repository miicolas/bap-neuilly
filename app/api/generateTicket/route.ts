import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import QRCode from "qrcode";

export async function GET() {
  try {
    // Données du billet (exemple)
    const ticket = {
      id: "12345",
      name: "John Doe",
      eventDate: new Date().toLocaleDateString(),
    };

    // Générer QR Code
    const qrCodeDataURL = await QRCode.toDataURL(`url/${ticket.id}`);

    // Lancer Puppeteer (navigateur sans interface graphique)
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    // Modèle HTML pour le billet
    const htmlContent = `
        <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            }
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .ticket {
                border: 2px solid black;
                padding: 20px;
                width: 400px;
                margin: auto;
            }
            h1 {
                font-size: 24px;
            }
            p {
                font-size: 16px;
            }
            .qr {
                margin-top: 20px;
            }
            .footer_image {
                margin-top: 40px;
                width: 400px;
            }
            </style>
        </head>
        <body>
            <div class="ticket">
                <header>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Logo-neuilly-sur-seine-officiel.svg/1200px-Logo-neuilly-sur-seine-officiel.svg.png" alt="Logo Neuily-sur-Seine" style="height: 50px;">
                    <img src="https://www.theatredessablons.com/template/theatre-des-sablons-2018/images/theatredessablons-neuilly-sur-seine.svg" alt="Logo Théatre des Sablons" style="height: 30px;">
                </header>
            <h1>Billet</h1>
            <p><strong>Nom :</strong> ${ticket.name}</p>
            <p><strong>Date :</strong> ${ticket.eventDate}</p>

            <!-- Code QR -->
            <div class="qr">
                <img src="${qrCodeDataURL}" width="150" height="150" alt="QR CODE"/>
            </div>

            <img
                src="https://www.neuillysurseine.fr/sites/neuilly-sur-seine-fr/files/2024-03/2024_03_26_salon-createurs.jpg"
                alt=""
                class="footer_image"
            />
            </div>
        </body>
        </html>

        `;

    // Définir le contenu de la page
    await page.setContent(htmlContent);

    // Générer le PDF en mémoire (sans enregistrer)
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Fermer le navigateur
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="billet-${ticket.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du billet :", error);
    return NextResponse.json(
      { error: "Échec de la génération du billet" },
      { status: 500 }
    );
  }
}
