'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Notification } from "@/models/notification";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    id: z.string().min(2, {
        message: "L'id de la notification doit contenir au moins 2 caractères",
    }),
});

export async function ReadNotificationAction( body: z.infer<typeof bodySchema>): Promise<FormResponse> {

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

        const read = await Notification.read(id);

        revalidatePath("/dashboard/");

        return { status: "success", content: read, message: "Notification read" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to read notification" };
    }

    
  
}