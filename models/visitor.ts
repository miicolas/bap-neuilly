import { db } from "@/db";
import { EventAttendee } from "@/db/schema";
import { eq } from "drizzle-orm";

export class Visitor {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public gender: "MALE" | "FEMALE" | "OTHER",
    public email: string,
    public city: string,
    public person: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.city = city;
    this.person = person;
  }

  async signup() {
    const checkEmail = await db
      .select()
      .from(EventAttendee)
      .where(eq(EventAttendee.email, this.email))
      .execute();

    if (checkEmail.length > 0) {
      throw new Error("Email already exists");
    }

    const event_attendee = await db
      .insert(EventAttendee)
      .values({
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        gender: this.gender,
        email: this.email,
        city: this.city,
        person: this.person,
      })
      .$returningId()
      .execute();

    return event_attendee;
  }

  async getUuid() {
    const event_attendee_id = await db
      .select({ id: EventAttendee.id })
      .from(EventAttendee)
      .where(eq(EventAttendee.email, this.email))
      .execute();

    return event_attendee_id[0].id;
  }

  async updateTicketNumber(ticketNumber: string) {
    const event_attendee_id = await db
      .select({ id: EventAttendee.id })
      .from(EventAttendee)
      .where(eq(EventAttendee.email, this.email))
      .execute();

    const updateTicketNumber = await db
      .update(EventAttendee)
      .set({ ticketNumber })
      .where(eq(EventAttendee.id, event_attendee_id[0].id))
      .execute();

    return updateTicketNumber;
  }

  static async list() {
    const event_attendee = await db
      .select({
        id: EventAttendee.id,
        ticketNumber: EventAttendee.ticketNumber,
        lastName: EventAttendee.lastName,
        person: EventAttendee.person
      })
      .from(EventAttendee)
      .execute();

    return event_attendee;
  }

  static async delete(id: string) {
    const event_attendee = await db
      .delete(EventAttendee)
      .where(eq(EventAttendee.id, id))
      .execute();

    return event_attendee;
  }
}