"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Users,
  CheckSquare,
  Sparkles,
  Github,
  Mail,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  GitBranch,
} from "lucide-react";
import { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechCardProps {
  title: string;
  items: string[];
}

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  const onDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-background/40 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-20">
          <div className="flex items-center gap-2">
            <GitBranch className="text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent">
              dev-stage
            </span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Button size="icon" variant="ghost" onClick={onDarkModeToggle}>
              {darkMode ? <Sun /> : <Moon />}
            </Button>
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </nav>
          <div className="flex gap-4 md:hidden">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={onDarkModeToggle}
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-36 text-center md:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              dev-stage: Next-Generation Collaboration for Developers.
            </h1>
            <p className="text-xl text-muted-foreground">
              Streamline project creation, real-time chat, and AI-powered coding
              assistance in one unified platform.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Have an invite link?
              </Button>
            </div>
          </div>
          <div className="relative mt-16">
            <div className="aspect-video overflow-hidden rounded-lg border shadow-xl">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="dev-stage platform interface"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform">
              <Badge className="px-3 py-1 text-sm">
                Revolutionizing developer collaboration
              </Badge>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-background py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to streamline your development workflow and
                enhance team collaboration.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Project & Team Management"
                description="Create projects and invite collaborators with fine-grained permission controls."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Dynamic Chatrooms"
                description="Real-time chat with AI prompts and context hooks (e.g., @codebase) to integrate your GitHub repository."
              />
              <FeatureCard
                icon={<CheckSquare className="h-10 w-10 text-primary" />}
                title="Task Management"
                description="Integrated ticket system similar to Jira for managing and tracking tasks within your projects."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="AI-Driven Assistance"
                description="Choose from options like Gemini 2.0, GPT-4, Claude, etc., with agentic capabilities to propose and commit code changes."
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Powered by Modern Tech
              </h2>
              <p className="text-lg text-muted-foreground">
                Built with the latest technologies to ensure performance,
                scalability, and developer experience.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard
                title="Frontend"
                items={["Next.js", "shadcnui", "TailwindCSS"]}
              />
              <TechCard title="State Management" items={["Zustand"]} />
              <TechCard
                title="Backend"
                items={["tRPC", "Drizzle ORM", "Next.js API routes"]}
              />
              <TechCard title="Database" items={["Neon PostgreSQL"]} />
              <TechCard title="Authentication" items={["BetterAuth"]} />
              <TechCard title="Deployment" items={["Vercel"]} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-muted/50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                About dev-stage
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                dev-stage transforms team collaboration by keeping context
                within each project. Our vision is to create a unified platform
                where developers can seamlessly manage projects, communicate in
                real-time, and leverage AI assistance to accelerate development
                workflows.
              </p>
              <p className="mb-10 text-lg leading-relaxed">
                By integrating project management, communication, and AI-powered
                coding assistance in one place, dev-stage eliminates context
                switching and helps teams stay focused on what matters most:
                building great software together.
              </p>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More About Our Mission <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Transform Your Development Workflow?
              </h2>
              <p className="mb-8 text-xl opacity-90">
                Join developers who are already using dev-stage to streamline
                their projects.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started for Free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">dev-stage</h3>
              <p className="text-muted-foreground">
                Next-Generation Collaboration for Developers
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} dev-stage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all hover:bg-accent/40">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function TechCard({ title, items }: TechCardProps) {
  return (
    <Card className="h-full transition-all hover:bg-accent/40">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
