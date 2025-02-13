import { db } from "@/db";
import { notification } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { read } from "fs";

export class Notification {
    constructor(
        public title: string,
        public description: string,
        public url: string
    ) { }

    async create() {
        return db
            .insert(notification)
            .values({
                id: crypto.randomUUID(),
                title: this.title,
                description: this.description,
                url: this.url,
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .$returningId()
            .execute();
    }

    static async list() {
        return db.select().from(notification).where(eq(notification.read, false)).execute();
    }

    static async read(id: string) {
        return db
            .update(notification)
            .set({ read: true })
            .where(eq(notification.id, id))
            .execute();
    }
}

