import { db } from "@/db";
import { ExposantTable } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export class Exposant {
  constructor(
    public firstName: string,
    public lastName: string,
    public type: string,
    public number: number,
    public email: string,
    public adresse: string,
    public city: string,
    public postalCode: string,
    public siret: string
  ) {}

  async signup() {
    // Vérifie si l'email existe déjà
    const checkEmail = await db
      .select()
      .from(ExposantTable)
      .where(eq(ExposantTable.email, this.email))
      .execute();

    if (checkEmail.length > 0) {
      throw new Error("Email already exists");
    }

    // Insère l'exposant dans la nouvelle table `exposant`
    const exposant = await db
      .insert(ExposantTable)
      .values({
        firstName: this.firstName,
        lastName: this.lastName,
        type: this.type,
        number: this.number,
        email: this.email,
        adresse: this.adresse,
        city: this.city,
        postalCode: this.postalCode,
        siret: this.siret,
      })
      .$returningId()
      .execute();

    return exposant[0].id;
  }

  async getUuid() {
    const exposant_id = await db
      .select({ id: ExposantTable.id })
      .from(ExposantTable)
      .where(eq(ExposantTable.email, this.email))
      .execute();

    if (!exposant_id.length) {
      throw new Error("Exposant non trouvé");
    }

    return exposant_id[0].id;
  }
}
