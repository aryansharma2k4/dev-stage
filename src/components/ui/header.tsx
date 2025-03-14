import React from "react";
import { GitBranch, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background/40 backdrop-blur-md border-b border-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-20">
        <Link href='/'>
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
          <Link href="/auth/sign-in">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
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
          <Link href="/auth/sign-in">
            <Button variant="outline" className="ml-auto">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="ml-auto">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
}