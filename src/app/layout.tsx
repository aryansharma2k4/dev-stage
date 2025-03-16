import "@/styles/globals.css";

import { type Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Dev-stage: Collaboration made easy",
  description: "Collaboration made easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <TRPCReactProvider><Providers><Toaster/>{children}</Providers></TRPCReactProvider>
      </body>
    </html>
  );
}
