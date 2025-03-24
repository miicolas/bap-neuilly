import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin";
import { cookies } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { session } from "@/db/schema";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token");

        if (!sessionToken || "error" in sessionToken) {
            return NextResponse.json(
                { error: "Session manquante" },
                { status: 400 }
            );
        }

        const getUser = await db
            .select()
            .from(session)
            .where(eq(session.token, sessionToken.value.split(".")[0]));

        if (!getUser || "error" in getUser) {
            return NextResponse.json(
                { error: "Session invalide" },
                { status: 400 }
            );
        }

        const searchEmailUser = await db
            .select()
            .from(user)
            .where(eq(user.id, getUser[0].userId));

        if (!searchEmailUser || "error" in searchEmailUser) {
            return NextResponse.json(
                { error: "Session invalide" },
                { status: 400 }
            );
        }

        const userEmail = searchEmailUser[0].email;
        const isAdmin = await Admin.checkAdmin(userEmail);

        if (isAdmin.length > 0) {
            const updateAdmin = await Admin.updateRoleAdmin(userEmail);
            if (!updateAdmin) {
                console.error("Erreur lors de la mise à jour du rôle admin");
            }
        }

        return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
        console.error("Erreur lors de la vérification admin:", error);
        return NextResponse.json(
            { error: "Erreur lors de la vérification" },
            { status: 500 }
        );
    }
}
