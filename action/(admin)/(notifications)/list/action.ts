'use server';

import { z } from "zod";
import { Notification } from "@/models/notification";
import { FormResponse } from "@/lib/type";

export async function ListNotificationAction(): Promise<FormResponse> {
    try {
        const list = await Notification.list();
        return { status: "success", content: list };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to retrieve notifications" };
    }
}
