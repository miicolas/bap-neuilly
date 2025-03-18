"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Exposant } from "@/models/exposant";

export async function GetExposantSelectAction(): Promise<FormResponse> {
    try {
        const list = await Exposant.getExposantSelect();

        return {
            status: "success",
            content: list,
            message: "Exposant List successfully",
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
