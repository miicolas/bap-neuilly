"use server";
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { ExposantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    imageId: z.string(),
    field: z.string(),
});

export async function updateExposantImage(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Données manquantes"
            };
        }

        const session = await getSession();

        if (!session) {
            throw new Error("Non autorisé");
        }

        const { imageId, field } = validatedBody.data;

        if (!imageId || !field) {
            throw new Error("Données manquantes");
        }
        const exposant = await db.select().from(ExposantTable).where(eq(ExposantTable.userId, session.user.id)).execute();

        if (!exposant[0]) {
            throw new Error("Exposant non trouvé");
        }
        await db
            .update(ExposantTable)
            .set({
                [field]: imageId
            })
            .where(eq(ExposantTable.id, exposant[0].id))
            .execute();

        return { status: "success" };
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'image:", error);
        throw new Error("Erreur interne du serveur");
    }
}