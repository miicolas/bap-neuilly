'use server';

import { z } from "zod";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

const bodySchema = z.object({
    id: z.string().min(1, {
        message: "L'identifiant doit contenir au moins 1 caractère",
    }),
});

export async function DeleteExposantAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {

        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues
            };
        }

        const { id } = validatedBody.data;

        const deleteExposant = await Exposant.delete(id);

        if (!deleteExposant) {
            return { status: "error", message: "Failed to delete exposant" };
        }

        revalidatePath("/dashboard/exposants");
        revalidatePath("/dashboard/exposants-waiting");

        return { status: "success", message: "Exposant deleted" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to delete exposant" };
    }
}
