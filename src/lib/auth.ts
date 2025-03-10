import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { cache } from "react";
import { headers } from "next/headers";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {  
        enabled: true
    },
    // socialProviders: { 
    //    github: { 
    //     clientId: process.env.GITHUB_CLIENT_ID, 
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    //    } 
    // }, 
});

export const getSession = cache(async ()=> {
    return await auth.api.getSession({
        headers: await headers(),
    });
});