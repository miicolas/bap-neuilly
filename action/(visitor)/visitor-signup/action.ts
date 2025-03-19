'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Visitor } from "@/models/visitor";
import { generateTicketId } from "@/lib/utils";
import { FormResponse } from "@/lib/type";

const bodySchema = z.object({
    firstName: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
    }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    age: z.number().min(0, {
        message: "L'âge doit être un nombre positif",
    }),
    city: z.string().min(2, {
        message: "La ville doit contenir au moins 2 caractères",
    }),
    person: z.number().min(1, {
        message: "Le nombre de personnes doit être un nombre positif",
    }),
    company: z.string().min(2, {
        message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    }),
});

export async function VisitorSignupAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: validatedBody.error.issues
            };
        }


        const { firstName, lastName, email, gender, age, city, person, company } = validatedBody.data;
        const visitor = new Visitor(
            firstName,
            lastName,
            age,
            gender,
            email,
            city,
            person,
            company

        );

        const signup = await visitor.signup();
        if (!signup) {
            return { status: "error", message: "Failed to create visitor" };
        }

        const uuid = await visitor.getUuid();

        if (!uuid) {
            return { status: "error", message: "Failed to get visitor uuid" };
        }

        const ticketNumber = generateTicketId(uuid);

        if (!ticketNumber) {
            return { status: "error", message: "Failed to generate ticket number" };
        }

        const updateTickerNumber = await visitor.updateTicketNumber(ticketNumber);

        if (!updateTickerNumber) {
            return { status: "error", message: "Failed to update ticket number" };
        }

        revalidatePath("/");

        return { status: "success", content: ticketNumber, message: "Ticket number generated" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid data format",
                errors: error.issues
            };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create event attendee" };
    }
}
