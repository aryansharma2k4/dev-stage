import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import "@/styles/globals.css";
 
export function generateStaticParams() {
    return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}
 
export default async function AuthPage(
    { params }: { params: Promise<{ pathname: string }> }
) {
    const { pathname } = await params
 
    return (
        <div className="flex flex-col items-center my-auto">
            <AuthCard pathname={pathname} />
        </div>
    )
}