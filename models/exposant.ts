import { db } from "@/db";
import { ExposantTable, user, ImageTable } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { Exposant as ExposantType } from "@/lib/type";
import { slugify } from "@/lib/utils";
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
        public companyName: string
    ) {}

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
                status: "pending",
                slug: slugify(this.companyName),
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
        const exposants = await db
            .select()
            .from(ExposantTable)
            .where(
                or(
                    eq(ExposantTable.status, "pending"),
                    eq(ExposantTable.status, "refused")
                )
            )
            .execute();
        return exposants;
    }

    static async list_accepted() {
        const exposants = await db
            .select({
                exposant: ExposantTable,
                logoUrl: ImageTable.picture,
                pictureUrl: ImageTable.picture,
                picture2Url: ImageTable.picture,
                picture3Url: ImageTable.picture,
                picture4Url: ImageTable.picture,
            })
            .from(ExposantTable)
            .leftJoin(ImageTable, eq(ExposantTable.logo, ImageTable.id))
            .where(eq(ExposantTable.status, "accepted"))
            .execute();

        return exposants.map((exposant) => ({
            ...exposant.exposant,
            logoUrl: exposant.logoUrl,
            pictureUrl: exposant.pictureUrl,
            picture2Url: exposant.picture2Url,
            picture3Url: exposant.picture3Url,
            picture4Url: exposant.picture4Url,
        }));
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
            .set({ userId: userId })
            .where(eq(ExposantTable.email, email))
            .execute();

        return exposant;
    }

    static async updateRole(userId: string) {
        const exposant = await db
            .update(user)
            .set({ role: "SELLER" })
            .where(eq(user.id, userId))
            .execute();
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

    static async addFile(
        userId: string,
        fileNameType: string,
        fileName: string
    ) {
        const exposant = await db
            .update(ExposantTable)
            .set({ [fileNameType]: fileName })
            .where(eq(ExposantTable.userId, userId))
            .execute();

        return exposant;
    }

    static async getFilesByUserId(userId: string) {
        const files = await db
            .select({
                picture: ExposantTable.picture,
                picture2: ExposantTable.picture2,
                picture3: ExposantTable.picture3,
                picture4: ExposantTable.picture4,
                logo: ExposantTable.logo,
            })
            .from(ExposantTable)
            .where(eq(ExposantTable.userId, userId))
            .execute();
        return files;
    }

    static async getExposantBySlug(slug: string) {
        const exposant = await db
            .select()
            .from(ExposantTable)
            .where(eq(ExposantTable.slug, slug))
            .execute();

        console.log(exposant);

        const images = await db
            .select()
            .from(ImageTable)
            .where(eq(ImageTable.exposantId, exposant[0].id))
            .execute();

        return { ...exposant[0], images };
    }

    static async updateExposant(id: string, data: ExposantType) {
        const exposant = await db
            .update(ExposantTable)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                type: data.type,
                adresse: data.adresse,
                city: data.city,
                postalCode: data.postalCode,
                siret: data.siret,
                products: data.products,
                history: data.history,
                companyName: data.companyName,
                status: data.status as "pending" | "accepted" | "refused",
                userId: data.userId,
                exposantId: data.exposantId,
            })
            .where(eq(ExposantTable.id, id))
            .execute();
        return exposant;
    }

    static async getExposantSelect() {
        const exposants = await db
            .select({
                id: ExposantTable.id,
                companyName: ExposantTable.companyName,
                slug: ExposantTable.slug,
                type: ExposantTable.type,
            })
            .from(ExposantTable)
            .where(eq(ExposantTable.status, "accepted"))
            .limit(10)
            .execute();

        const exposantsWithImages = await Promise.all(
            exposants.map(async (exposant) => {
                const images = await db
                    .select({ picture: ImageTable.picture })
                    .from(ImageTable)
                    .where(eq(ImageTable.exposantId, exposant.id))
                    .execute();

                return {
                    ...exposant,
                    images,
                };
            })
        );

        return exposantsWithImages;
    }
}
