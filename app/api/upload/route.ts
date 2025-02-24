import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { ImageTable, ExposantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { put } from "@/lib/minios-client";
import { Exposant } from "@/models/exposant";

export async function POST(req: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return new NextResponse("Non autorisé", { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const fileName = formData.get("fileName") as string;

        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueFileName = `${Date.now()}-${file.name}`;
        const putResult = await put(uniqueFileName, buffer);

        if (!putResult) {
            return new NextResponse("Erreur lors de l'upload", { status: 500 });
        }

        const exposant = await Exposant.getExposantByUserId(session.user.id);

        if (!exposant[0]) {
            return new NextResponse("Exposant non trouvé", { status: 404 });
        }

        const imageResult = await db
            .insert(ImageTable)
            .values({
                exposantId: exposant[0].id,
                picture: uniqueFileName,
            })
            .execute();

        if (!imageResult) {
            return new NextResponse("Erreur lors de la création de l'image", {
                status: 500,
            });
        }

        const [newImage] = await db
            .select()
            .from(ImageTable)
            .where(eq(ImageTable.picture, uniqueFileName))
            .execute();

        if (!newImage) {
            return new NextResponse("Erreur lors de la création de l'image", {
                status: 500,
            });
        }

        const updateResult = await db
            .update(ExposantTable)
            .set({
                [fileName]: newImage.id,
            })
            .where(eq(ExposantTable.id, exposant[0].id))
            .execute();

        if (!updateResult) {
            return new NextResponse(
                "Erreur lors de la mise à jour de l'image",
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            filename: uniqueFileName,
            id: newImage.id,
        });
    } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        return new NextResponse("Erreur interne du serveur", { status: 500 });
    }
}
