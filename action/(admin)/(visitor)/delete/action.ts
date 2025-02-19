'use server';

import { z } from "zod";
import { Visitor } from "@/models/visitor";
import { FormResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

const bodySchema = z.object({
    id: z.string().min(1, {
        message: "L'identifiant doit contenir au moins 1 caractère",
    }),
});

export async function DeleteVisitorAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
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

        console.log("ticketNumber", id);
        const deleteVisitor = await Visitor.delete(id);

        if (!deleteVisitor) {
            return { status: "error", message: "Failed to delete visitor" };
        }

        revalidatePath("/dashboard/visitors");

        return { status: "success", message: "Visitors deleted" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to delete visitor" };
    }
}
