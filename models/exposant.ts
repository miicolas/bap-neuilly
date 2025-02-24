import { db } from "@/db";
import { ExposantTable, user } from "@/db/schema";
import { eq } from "drizzle-orm";


export class Exposant {
  constructor(
    public firstName: string,
    public lastName: string,
    public type: string,
    public email: string,
    public adresse: string,
    public city: string,
    public postalCode: string,
    public siret: string,
    public products: string,
    public history: string,
    public companyName: string,

  ) { }

  async signup() {
    const checkEmail = await db
      .select()
      .from(ExposantTable)
      .where(eq(ExposantTable.email, this.email))
      .execute();

    if (checkEmail.length > 0) {
      throw new Error("Email already exists");
    }

    const exposant = await db
      .insert(ExposantTable)
      .values({
        firstName: this.firstName,
        lastName: this.lastName,
        type: this.type,
        email: this.email,
        adresse: this.adresse,
        city: this.city,
        postalCode: this.postalCode,
        siret: this.siret,
        products: this.products,
        history: this.history,
        companyName: this.companyName,
        status: "pending"
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

  static async list_pending() {
    const exposants = await db.select().from(ExposantTable).where(eq(ExposantTable.status, "pending")).execute();
    return exposants;
  }

  static async list_accepted() {
    const exposants = await db.select().from(ExposantTable).where(eq(ExposantTable.status, "accepted")).execute();
    return exposants;
  }

  async updateExposantId(exposantId: string) {
    const exposant_id = await db
      .select({ id: ExposantTable.id })
      .from(ExposantTable)
      .where(eq(ExposantTable.email, this.email))
      .execute();

    const updateTicketNumber = await db
      .update(ExposantTable)
      .set({ exposantId })
      .where(eq(ExposantTable.id, exposant_id[0].id))
      .execute();

    return updateTicketNumber;
  }

  static async delete(id: string) {
    const deleteExposant = await db
      .delete(ExposantTable)
      .where(eq(ExposantTable.id, id))
      .execute();

    return deleteExposant;
  }

  static async accept(id: string) {
    const exposant = await db
      .update(ExposantTable)
      .set({ status: "accepted" })
      .where(eq(ExposantTable.id, id))
      .execute();

    return exposant;
  }

  static async refuse(id: string) {
    const exposant = await db
      .update(ExposantTable)
      .set({ status: "refused" })
      .where(eq(ExposantTable.id, id))
      .execute();

    return exposant;
  }

  static async associateUser(email: string, userId: string) {
    const exposant = await db
      .update(ExposantTable)
      .set({ userId : userId })
      .where(eq(ExposantTable.email, email))
      .execute();

    return exposant;
  }

  static async updateRole(userId: string) {
    const exposant = await db.update(user).set({ role: "SELLER" }).where(eq(user.id, userId)).execute();
    return exposant;
  }

  static async getExposantByUserId(userId: string) {
    const exposant = await db
      .select()
      .from(ExposantTable)
      .where(eq(ExposantTable.userId, userId))
      .execute();

    return exposant;
  }

  static async addFile( userId: string, fileNameType: string, fileName: string) {
    const exposant = await db
      .update(ExposantTable)
      .set({ [fileNameType]: fileName })
      .where(eq(ExposantTable.userId, userId))
      .execute();

    return exposant;
  }

  static async getFilesByUserId(userId: string) {
    const files = await db.select({picture: ExposantTable.picture, picture2: ExposantTable.picture2, picture3: ExposantTable.picture3, picture4: ExposantTable.picture4, logo: ExposantTable.logo}).from(ExposantTable).where(eq(ExposantTable.userId, userId)).execute();
    return files;
  }

}
