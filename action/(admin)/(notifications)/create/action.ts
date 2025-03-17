'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Notification } from "@/models/notification";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères",
    }),
    description: z.string().min(2, {
        message: "La description doit contenir au moins 2 caractères",
    }),
    type: z.enum(["exposant", "visitor"]),
});

export async function CreateNotificationAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues
            };
        }

        const { title, description, type } = validatedBody.data;

        const notification = new Notification(title, description, type);

        const create = await notification.create();

        if (!create) {
            return { status: "error", message: "Failed to create notification" };
        } 

        revalidatePath("/dashboard/");

        return { status: "success", message: "Notification created" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create n" };
    }
}