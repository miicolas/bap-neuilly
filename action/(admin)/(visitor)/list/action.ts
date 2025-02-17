'use server';

import { z } from "zod";
import { Visitor } from "@/models/visitor";
import { FormResponse } from "@/lib/type";

export async function ListVisitorsAction(): Promise<FormResponse> {
    try {
        const list = await Visitor.list();
        return { status: "success", content: list, message: "Visitors retrieved" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format", errors: error.issues };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to retrieve notifications" };
    }
}
