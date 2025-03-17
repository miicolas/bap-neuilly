'use server';

import { z } from "zod";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";

const getExposantSchema = z.object({
    companyName: z.string().min(2, {
        message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    }),
});

export async function GetExposantAction(filters: z.infer<typeof getExposantSchema>): Promise<FormResponse> {
    try {
        const validatedFilters = getExposantSchema.safeParse(filters);
        if (!validatedFilters.success) {
            return { status: "error", message: "Format de données invalide", errors: validatedFilters.error.issues };
        }

        const exposant = await Exposant.getExposantByCompanyName(validatedFilters.data.companyName);
        if (!exposant || exposant.length === 0) {
            return { status: "error", message: "Exposant non trouvé" };
        }

        return { status: "success", content: exposant[0], message: "Exposant retrieved" };

    } catch (error) {
        console.error("Erreur lors de la récupération de l'exposant :", error);
        return { status: "error", message: "Échec de la récupération de l'exposant" };
    }
}
