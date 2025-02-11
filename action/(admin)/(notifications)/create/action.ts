'use server';

import { db } from "@/db";
import { notification } from "@/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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


export async function CreateNotificationAction(body: z.infer<typeof bodySchema>) {
    try {
        const validatedBody = bodySchema.parse(body);


        const create_notification = await db.insert(notification)
            .values({
                id: crypto.randomUUID() as string, 
                title: validatedBody.title as string, 
                description: validatedBody.description as string, 
                url: validatedBody.url as string,
                read: false as boolean, 
                createdAt: new Date() as Date, 
                updatedAt: new Date() as Date, 
            }).$returningId().execute();

        revalidatePath("/dashboard/");


        return { status: "success", create_notification };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format" };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create n" };
    }
}