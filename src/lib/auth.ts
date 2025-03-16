import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { cache } from "react";
import { headers } from "next/headers";
import * as authSchema from "@/server/db/auth-schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "no-reply@dev-stage-beta.vercel.app";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: authSchema,
    }),
    emailAndPassword: {  
        enabled: true,
    },
    // socialProviders: { 
    //    github: { 
    //     clientId: process.env.GITHUB_CLIENT_ID, 
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    //    } 
    // }, 
});

export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
});
