'use client'

import { AuthCard } from "@daveyplate/better-auth-ui"
import "@/styles/globals.css"
import { useParams } from "next/navigation"
import Header from "@/components/Header"

// export function generateStaticParams() {
//     return Object.values(authViewPaths).map((pathname) => ({ pathname }))
// }

export default function AuthPage() {

    const { pathname } = useParams();
    const path = Array.isArray(pathname) ? pathname[0] : pathname;
    
    return (
        <>
        <Header/>
        <div className="flex flex-col items-center my-auto h-screen justify-center">
            <AuthCard pathname={path} />
        </div>
        </>
    )
}
