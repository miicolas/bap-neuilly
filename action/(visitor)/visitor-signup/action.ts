'use server';

import { db } from "@/db";
import { EventAttendee } from "@/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm/expressions";
import { generateTicketId } from "@/lib/utils";

const bodySchema = z.object({
    firstname: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères",
    }),
    lastname: z.string().min(2, {
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
});

export async function VisitorSignupAction(body: z.infer<typeof bodySchema>) {
    try {
        const validatedBody = bodySchema.safeParse(body);

        if (!validatedBody.success) {
            return { status: "error", message: validatedBody.error.message };
        }

        const checkEmail = await db
            .select()
            .from(EventAttendee)
            .where(eq(EventAttendee.email, validatedBody.data.email))
            .execute();

        if (checkEmail.length > 0) {
            return { status: "error", message: "Email already exists" };
        }

        const event_attendee = await db.insert(EventAttendee)
            .values({
                firstName: validatedBody.data.firstname,
                lastName: validatedBody.data.lastname,
                email: validatedBody.data.email,
                gender: validatedBody.data.gender,
                age: validatedBody.data.age,
                city: validatedBody.data.city,
                person: validatedBody.data.person
            }).$returningId().execute();

        revalidatePath("/");

        const event_attendee_id = await db.select({ id: EventAttendee.id }).from(EventAttendee).where(eq(EventAttendee.email, validatedBody.data.email)).execute();

        const ticketNumber = generateTicketId(event_attendee_id[0].id);

        if (!ticketNumber) {
            return { status: "error", message: "Failed to generate ticket number" };
        }

        const updateTicketNumber = await db
            .update(EventAttendee)
            .set({ ticketNumber })
            .where(eq(EventAttendee.id, event_attendee_id[0].id))
            .execute();

        if (!updateTicketNumber) {
            return { status: "error", message: "Failed to update ticket number" };
        }

        return { status: "success", ticketNumber };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format" };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create event attendee" };
    }
}