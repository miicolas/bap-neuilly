'use server';

import { db } from "@/db";
import { EventAttendee } from "@/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm/expressions";

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
        const validatedBody = bodySchema.parse(body);

        if (!validatedBody.firstname || !validatedBody.lastname || !validatedBody.email || !validatedBody.gender || !validatedBody.age || !validatedBody.city || !validatedBody.person) {
            return { status: "error", message: "Missing required fields" };
        }

        const checkEmail = await db
            .select()
            .from(EventAttendee)
            .where(eq(EventAttendee.email, validatedBody.email))
            .execute();

        if (checkEmail.length > 0) {
            return { status: "error", message: "Email already exists" };
        }

        const event_attendee = await db.insert(EventAttendee)
            .values({
                firstName: validatedBody.firstname,
                lastName: validatedBody.lastname,
                email: validatedBody.email,
                gender: validatedBody.gender,
                age: validatedBody.age,
                city: validatedBody.city,
                person: validatedBody.person
            }).$returningId()
            .execute();

        revalidatePath("/dashboard/projects");
        revalidatePath("/projects");
        revalidatePath("/");

        return { status: "success", event_attendee };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "error", message: "Invalid data format" };
        }
        console.error("Database error:", error);
        return { status: "error", message: "Failed to create project" };
    }
}