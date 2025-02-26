"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Event } from "@/models/event";

export async function GetEventDetailsAction(): Promise<FormResponse> {
    try {
        const list = await Event.list();

        const formatEventDate = (date: Date) =>
            date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" });
        const dayEvent = list.map((event) => formatEventDate(event.eventDate));
        const dayEventEnd = list.map((event) =>
            formatEventDate(event.eventDateEnd)
        );
        const localisation = list.map((event) => event.eventLocation);

        return {
            status: "success",
            content: { dayEvent, dayEventEnd, localisation },
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
