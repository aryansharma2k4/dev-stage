import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://dev-stage-beta.vercel.app" // the base url of your auth server
})