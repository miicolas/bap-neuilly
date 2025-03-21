"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Admin } from "@/models/admin";
import { revalidatePath } from "next/cache";
const bodySchema = z.object({
    adminEmail: z.string().email({
        message: "L'email doit être une adresse email valide",
    }),
});
export async function DeleteAdminAction(
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
        const { adminEmail } = validatedBody.data;

        const admin = await Admin.checkAdmin(adminEmail);

        if (admin.length === 0) {
            return {
                status: "error",
                message: "Admin not found",
            };
        }

        const deleteAdmin = await Admin.delete(adminEmail);

        if (!deleteAdmin) {
            return {
                status: "error",
                message: "Failed to delete admin",
            };
        }

        revalidatePath("/dashboard/parameters");

        return {
            status: "success",
            message: "Sucessfully deleted admin",
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
