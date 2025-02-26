"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Event } from "@/models/event";
import { revalidatePath } from "next/cache";
const bodySchema = z.object({
    eventName: z.string().min(2, {
        message: "Le nom de l'événement doit contenir au moins 2 caractères",
    }),
    eventDate: z.date(),
    eventDateEnd: z.date(),
    eventLocation: z.string().min(2, {
        message:
            "La localisation de l'événement doit contenir au moins 2 caractères",
    }),
    eventDescription: z.string().min(2, {
        message:
            "La description de l'événement doit contenir au moins 2 caractères",
    }),
});
export async function UpdateEventAction(
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

        const { eventName, eventDate, eventDateEnd, eventLocation, eventDescription } = validatedBody.data;

        const event = new Event(eventName, eventDate, eventDateEnd, eventLocation, eventDescription);

        if (!event) {
            return {
                status: "error",
                message: "Event not created",
            };
        }

        const listEvent = await Event.list();

        if (!listEvent) {
            return {
                status: "error",
                message: "Event not found",
            };
        }

        const updatedEvent = await event.update(listEvent[0].id);

        if (!updatedEvent) {
            return {
                status: "error",
                message: "Event not updated",
            };
        }

        revalidatePath("/dashboard/parameters/event");

        return {
            status: "success",
            message: "Event updated successfully",
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
