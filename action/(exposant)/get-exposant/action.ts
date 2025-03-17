"use server";

import { z } from "zod";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    slug: z.string().min(2, {
        message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    }),
});

export async function GetExposantAction(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Format de données invalide",
                errors: validatedBody.error.issues,
            };
        }

        console.log(validatedBody.data.slug, "slug");

        const exposant = await Exposant.getExposantBySlug(
            validatedBody.data.slug
        );

        if (!exposant) {
            return { status: "error", message: "Exposant non trouvé" };
        }

        return {
            status: "success",
            content: { ...exposant, images: exposant.images },
            message: "Exposant retrieved",
        };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'exposant :", error);
        return {
            status: "error",
            message: "Échec de la récupération de l'exposant",
        };
    }
}
