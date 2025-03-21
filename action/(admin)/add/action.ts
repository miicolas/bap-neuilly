"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Admin } from "@/models/admin";
import { revalidatePath } from "next/cache";
const bodySchema = z.object({
    adminName: z.string().min(2, {
        message: "Le nom de l'événement doit contenir au moins 2 caractères",
    }),
    adminEmail: z.string().email({
        message: "L'email doit être une adresse email valide",
    }),
});
export async function AddAdminAction(
    body: z.infer<typeof bodySchema>
): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues,
            };
        }
        const { adminName, adminEmail } = validatedBody.data;


        const check = await Admin.checkAdmin(adminEmail);

        if (check.length > 0) {
            return {
                status: "error",
                message: "Admin already exists",
            };
        }
        const add = await Admin.add(adminName, adminEmail);

        if (!add) {
            return {
                status: "error",
                message: "Failed to add admin",
            };
        }

        revalidatePath("/dashboard/parameters");

        return {
            status: "success",
            message: "Sucessfully added admin",
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
        return { status: "error", message: "Failed to update event" };
    }
}
