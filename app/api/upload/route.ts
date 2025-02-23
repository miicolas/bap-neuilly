import { NextRequest, NextResponse } from "next/server";
import minioClient from "@/lib/minios-client";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const optimizedBuffer = await sharp(buffer)
      .resize(800)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();

    if (!optimizedBuffer) {
      return NextResponse.json({ error: "Erreur lors de l'optimisation de l'image" }, { status: 500 });
    }

    const fileName = file.name.replace(/\.[^/.]+$/, ".webp");

    const uploadResponse = await minioClient.putObject(
      process.env.S3_BUCKET_NAME || "",
      fileName,
      optimizedBuffer,
      undefined,
      {
        "Content-Type": "image/webp",
      }
    );

    return NextResponse.json({
      message: "Fichier uploadé avec succès",
      filename: fileName,
      etag: uploadResponse.etag,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
