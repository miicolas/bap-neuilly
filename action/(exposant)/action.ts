'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    firstname: z.string().min(2, {
        message: "Le prénom d'utilisateur doit contenir au moins 2 caractères"
      }),
      lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
      }),
      type: z.enum(["EXPOSANT", "VISITEUR"]),
      number: z.number().min(0, {
        message: "Le nombre doit être un nombre positif",
      }),
      email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
      }),
      adresse: z.string().min(2, {
        message: "L'adresse doit contenir au moins 2 caractères",
      }),
      city: z.string().min(2, {
        message: "La ville doit contenir au moins 2 caractères",
      }),
      postalCode: z.string().min(2, {
        message: "Le code postal doit contenir au moins 2 caractères",
      }),
      siret: z.string().min(2, {
        message: "Le siret doit contenir au moins 2 caractères",
      }),
});
    
export async function ExposantSignupAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues
            };
        }

        const { firstname, lastName, type, number, email, adresse, city, postalCode, siret } = validatedBody.data;
        const exposant = new Exposant(
            firstname,
            lastName,
            type,
            number,
            email,
            adresse,
            city,
            postalCode,
            siret
        );

        const signup = await exposant.signup();
        if (!signup) {
            return { status: "error", message: "Failed to create exposant" };
        }

        const uuid = await exposant.getUuid();
        
        if (!uuid) {
            return { status: "error", message: "Failed to get exposant uuid" };
        }

        revalidatePath("/");

        return { status: "success", message: "Exposant created successfully" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues
            }
        }
        console.error("Database error", error);
        return { status: "error", message: "Database error" };
    }
}