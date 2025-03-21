import { db } from "@/db";
import { AdminTable, user } from "@/db/schema";
import { eq } from "drizzle-orm";
export class Admin {
    constructor(
        public eventName: string,
        public eventDateStart: Date | undefined,
        public eventDateEnd: Date | undefined,
        public eventLocation: string,
        public eventDescription: string,
    ) { }

    static async list() {
        return db.select().from(AdminTable).execute();
    } 

    static async add(adminName: string, adminEmail: string) {
        return db.insert(AdminTable).values({
            name: adminName,
            email: adminEmail,
        }).execute();
    }

    static async delete(adminEmail: string) {
        return db.delete(AdminTable).where(eq(AdminTable.email, adminEmail)).execute();
    }

    static async checkAdmin(adminEmail: string) {
        return db.select().from(AdminTable).where(eq(AdminTable.email, adminEmail)).execute();
    }

    static async updateRoleAdmin(adminEmail: string) {
        return db.update(user).set({ role: "ADMIN" }).where(eq(user.email, adminEmail)).execute();
    }

}

