'use server'
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
});

export async function VisitorSignupAction(body: z.infer<typeof bodySchema>) {
    try {
        const validateBody = bodySchema.safeParse(body);

        if (!validateBody.success) {
            console.error(validateBody.error);
            return { error: validateBody.error.format(), status: 400 };
        }

        const { firstName, lastName, email, gender, age, city, person } = validateBody.data;

        const visitor = await prisma.event_Attendee.create({
            data: {
                firstName,
                lastName,
                email,
                gender,
                age,
                city,
                person,
            },
        });

        return { content: visitor, status: 201 };
    } catch (error) {
        console.error(error);
        return { error: "Une erreur interne est survenue", status: 500 };
    }
}