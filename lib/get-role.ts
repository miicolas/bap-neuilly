import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export async function getRole(email: string) {
    const userResponse = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .execute();

    return userResponse[0].role;
}
