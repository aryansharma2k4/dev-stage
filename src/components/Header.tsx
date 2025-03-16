"use client"
import React, { useState, useEffect } from "react";
import { GitBranch, Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { Session } from "better-auth/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SessionData {
  data: {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  } | null;
}

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await authClient.getSession();
        setSession(data as SessionData);
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const isAuthenticated = !!session?.data?.user;

  const onDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (): string => {
    const userName = session?.data?.user?.name;
    if (!userName) return "U";
    
    return userName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background/40 backdrop-blur-md border-b border-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-20">
        <Link href="/">
          <div className="flex items-center gap-2">
            <GitBranch className="text-primary dark:text-secondary-foreground" />
            <span className="bg-gradient-to-r from-primary dark:from-secondary-foreground dark:to-secondary-foreground/80 to-primary/50 bg-clip-text text-2xl font-bold text-transparent">
              dev-stage
            </span>
          </div>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Button size="icon" variant="ghost" onClick={onDarkModeToggle}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          
          {isLoading ? (
            <div className="h-8 w-20 bg-muted animate-pulse rounded-md"></div>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.data?.user?.image ?? ""} alt="Profile" />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile controls */}
        <div className="flex gap-4 md:hidden">
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={onDarkModeToggle}
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/40 z-20 backdrop-blur-md border-b border-background px-4 py-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300">
          {isLoading ? (
            <div className="h-8 w-full bg-muted animate-pulse rounded-md"></div>
          ) : isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.data?.user?.image ?? ""} alt="Profile" />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{session?.data?.user?.name ?? "User"}</span>
              </div>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full justify-start">
                  Profile
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className="w-full">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up" className="w-full">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}