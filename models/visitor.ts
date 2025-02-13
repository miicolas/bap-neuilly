import { db } from "@/db";
import { EventAttendee } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export class Visitor {
  constructor(
    public firstname: string,
    public lastname: string,
    public age: number,
    public gender: "MALE" | "FEMALE" | "OTHER",
    public email: string,
    public city: string,
    public person: number
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
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
        firstName: this.firstname,
        lastName: this.lastname,
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
}