import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },
    trustedOrigins: [
        'https://dev-bap-neuilly.nicolas-becharat.com',
        'https://dev-bap-neuilly.nicolas-becharat.com/api/auth',
        'https://bap-neuilly.nicolas-becharat.com',
        'https://bap-neuilly.nicolas-becharat.com/api/auth',
        'https://localhost:3000',
        'https://localhost:3000/api/auth',
    ],
});
