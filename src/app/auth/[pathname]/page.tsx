import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import "@/styles/globals.css"

export function generateStaticParams() {
    return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}

export default function AuthPage() {
    return (
        <div className="flex flex-col items-center my-auto">
            <AuthCard pathname="sign-in" />
        </div>
    )
}
