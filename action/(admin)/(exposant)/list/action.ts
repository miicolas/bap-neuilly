'use server';

import { z } from "zod";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";

export async function ListExposantsAction(): Promise<FormResponse> {
    try {
        const list = await Exposant.list_accepted();

        return { status: "success", content: list, message: "Exposants retrieved" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to retrieve exposants" };
    }
}
