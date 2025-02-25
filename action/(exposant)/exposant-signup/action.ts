'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Exposant } from "@/models/exposant";
import { FormResponse } from "@/lib/type";
import { generateExposantId } from "@/lib/utils";

const bodySchema = z.object({
  firstname: z.string().min(2, {
    message: "Le prénom d'utilisateur doit contenir au moins 2 caractères"
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  type: z.array(z.string()).min(1, {
    message: "Veuillez sélectionner au moins un type",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  adresse: z.string().min(2, {
    message: "L'adresse doit contenir au moins 2 caractères",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères",
  }),
  postalCode: z.string().min(2, {
    message: "Le code postal doit contenir au moins 2 caractères",
  }),
  siret: z.string().min(2, {
    message: "Le siret doit contenir au moins 2 caractères",
  }),
  products: z.string().min(2, {
    message: "Le produit doit contenir au moins 2 caractères",
  }),
  history: z.string().min(2, {

    message: "La description de votre histoire doit contenir au moins 2 caractères",
  }),
  companyName: z.string().min(2, {
    message: "Le nom de votre société doit contenir au moins 2 caractères",
  }),
  userId: z.string().min(2, {
    message: "Le User Id doit contenir au moins 2 caractères",
  }),
});

export async function ExposantSignupAction(body: z.infer<typeof bodySchema>): Promise<FormResponse> {
  try {
    const validatedBody = bodySchema.safeParse(body);

    if (!validatedBody.success) {
      return {
        status: "error",
        message: "Invalid data format",
        errors: validatedBody.error.issues
      };
    }

    const { firstname, lastName, type, email, adresse, city, postalCode, siret, products, history, companyName } = validatedBody.data;
    const exposant = new Exposant(
      firstname,
      lastName,
      type.join(","),
      email,
      adresse,
      city,
      postalCode,
      siret,
      products,
      history,
      companyName,
    );

    const signup = await exposant.signup();
    if (!signup) {
      return { status: "error", message: "Failed to create exposant" };
    }

    const uuid = await exposant.getUuid();

    if (!uuid) {
      return { status: "error", message: "Failed to get exposant uuid" };
    }

    const exposant_id = generateExposantId(uuid);

    if (!exposant_id) {
      return { status: "error", message: "Failed to generate exposant id" };
    }

    const updateExposantId = await exposant.updateExposantId(exposant_id);

    if (!updateExposantId) {
      return { status: "error", message: "Failed to update exposant id" };

    }
    const { userId } = validatedBody.data;

    const associateAccount = await Exposant.associateUser(email, userId);

    if (!associateAccount) {
      return { status: "error", message: "Failed to associate user" };
    }

    const updateStatus = await Exposant.updateRole(userId);

    if (!updateStatus) {
      return { status: "error", message: "Failed to update role" };
    }

    revalidatePath("/");

    return { status: "success", message: "Exposant created successfully", content: exposant_id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Invalid data format",
        errors: error.issues
      }
    }
    console.error("Database error", error);
    return { status: "error", message: "Database error" };
  }
}