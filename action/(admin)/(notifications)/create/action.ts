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
    url: z.string().min(2, {
        message: "L'url doit contenir au moins 2 caractères",
    }),
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


        const { title, description, url } = validatedBody.data;

        const create_notification = new Notification(title, description, url);


        revalidatePath("/dashboard/");


        return { status: "success", content: create_notification, message: "Notification created" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create n" };
    }
}