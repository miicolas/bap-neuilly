import { db } from "@/db";
import { notification } from "@/db/schema";


export class Notification {
    constructor(
        public title: string,
        public description: string,
        public url: string,
    ) {
        this.title = title;
        this.description = description;
        this.url = url;
    }

    async create() {
        const newNotification = await db.insert(notification).values({
            id: crypto.randomUUID() as string, 
            title: this.title as string,
            description: this.description as string,
            url: this.url as string,
            read: false as boolean, 
            createdAt: new Date() as Date, 
            updatedAt: new Date() as Date, 
        }).$returningId().execute();;
    }
}