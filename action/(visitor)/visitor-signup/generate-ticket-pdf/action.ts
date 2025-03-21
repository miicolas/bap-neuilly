import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

interface TicketData {
    firstName: string;
    lastName: string;
    ticketNumber: string;
    eventDate: string;
    eventName: string;
    eventLocation: string;
}

export const generateTicketPDF = async (ticketData: TicketData): Promise<Buffer> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // Load a built-in font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(
        JSON.stringify({
            ticketNumber: ticketData.ticketNumber,
            firstName: ticketData.firstName,
            lastName: ticketData.lastName,
        })
    );
    
    const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    const { width, height } = page.getSize();
    page.drawText(ticketData.eventName, { x: 50, y: height - 50, font, size: 24, color: rgb(0, 0, 0) });
    page.drawText(`Billet #${ticketData.ticketNumber}`, { x: 50, y: height - 100, font, size: 16 });

    page.drawImage(qrImage, { x: 50, y: 300, width: 150, height: 150 });
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
};
