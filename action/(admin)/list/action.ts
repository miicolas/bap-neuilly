"use server";

import { z } from "zod";
import { FormResponse } from "@/lib/type";
import { Admin } from "@/models/admin";

export async function ListAdminAction(): Promise<FormResponse> {
    try {
        const list = await Admin.list();

        return {
            status: "success",
            content: list,
            message: "Admin List successfully",
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
