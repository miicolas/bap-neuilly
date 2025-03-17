import { db } from "@/db";
import { notification } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export class Notification {
    constructor(
        public title: string,
        public description: string,
        public type: string,
    ) { }

    async create() {
        return db
            .insert(notification)
            .values({
                id: crypto.randomUUID(),
                title: this.title,
                description: this.description,
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                type : this.type
            })
            .$returningId()
            .execute();
    }

    static async list() {
        return db.select().from(notification).where(eq(notification.read, false)).execute();
    }

    static async read(id: string) {
        return db
            .delete(notification)
            .where(eq(notification.id, id))
            .execute();
    }
}

