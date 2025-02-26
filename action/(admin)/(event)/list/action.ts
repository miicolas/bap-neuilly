"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Event } from "@/models/event";

export async function ListEventAction(): Promise<FormResponse> {
    try {
        const list = await Event.list();

        return {
            status: "success",
            content: list,
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
