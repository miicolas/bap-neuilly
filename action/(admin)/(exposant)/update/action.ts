"use server";

import { Exposant } from "@/models/exposant";
import { Exposant as ExposantType, FormResponse } from "@/lib/type";
import { z } from "zod";
import { revalidatePath } from "next/cache";
const bodySchema = z.object({
    id: z.string(),
    data: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        type: z.string(),
        adresse: z.string(),
        city: z.string(),
        postalCode: z.string(),
        siret: z.string(),
        products: z.string(),
        history: z.string(),
        companyName: z.string(),
        status: z.enum(["pending", "accepted", "refused"]),
        userId: z.string(),
        exposantId: z.string(),
    }),
});

export async function UpdateExposantAction(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid body",
            };
        }

        const { id, data } = validatedBody.data;

        const exposant = await Exposant.updateExposant(
            id,
            data as ExposantType
        );

        if (!exposant) {
            return {
                status: "error",
                message: "Exposant not found",
            };
        }

        revalidatePath("/dashboard/exposants");
        revalidatePath("/dashboard/exposants-waiting");
        revalidatePath(`/dashboard/exposants/${data.companyName}`);
        revalidatePath(`/exposants/${data.companyName}`);

        return {
            status: "success",
            message: "Exposant updated",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues,
            };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to update exposant" };
    }
}
