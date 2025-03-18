import { db } from "@/db";
import { EventTable } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export class Event {
    constructor(
        public eventName: string,
        public eventDateStart: Date | undefined,
        public eventDateEnd: Date | undefined,
        public eventLocation: string,
        public eventDescription: string
    ) {}

    async update(id: string) {
        return db
            .update(EventTable)
            .set({
                eventName: this.eventName,
                eventDate: this.eventDateStart
                    ? new Date(this.eventDateStart)
                    : new Date(),
                eventDateEnd: this.eventDateEnd
                    ? new Date(this.eventDateEnd)
                    : undefined,
                eventLocation: this.eventLocation,
                eventDescription: this.eventDescription,
            })
            .where(eq(EventTable.id, id))
            .execute();
    }
    static async list() {
        return db.select().from(EventTable).execute();
    }
}
