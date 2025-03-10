"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, CheckSquare, Sparkles, Github, Mail, ArrowRight, Moon, Sun } from "lucide-react"
import { useState } from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface TechCardProps {
  title: string
  items: string[]
}

export default function LandingPage() {
  const [darkMode, setDarkMode]=useState(false)


  const onDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            dev-stage
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </a>
          <a href="#tech-stack" className="text-sm font-medium hover:text-primary">
            Tech Stack
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary">
            About
          </a>
          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
          <Button size="sm" variant='outline' onClick={onDarkModeToggle}>{darkMode ? <Sun /> : <Moon />}</Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto py-20 px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              dev-stage: Next-Generation Collaboration for Developers
            </h1>
            <p className="text-xl text-muted-foreground">
              Streamline project creation, real-time chat, and AI-powered coding assistance in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Have an invite link?
              </Button>
            </div>
          </div>
          <div className="mt-16 relative">
            <div className="aspect-video rounded-lg overflow-hidden border shadow-xl">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="dev-stage platform interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <Badge className="text-sm py-1 px-3">Revolutionizing developer collaboration</Badge>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to streamline your development workflow and enhance team collaboration.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Modern Tech</h2>
              <p className="text-muted-foreground text-lg">
                Built with the latest technologies to ensure performance, scalability, and developer experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <TechCard title="Frontend" items={["Next.js", "shadcnui", "TailwindCSS"]} />
              <TechCard title="State Management" items={["Zustand"]} />
              <TechCard title="Backend" items={["tRPC", "Drizzle ORM", "Next.js API routes"]} />
              <TechCard title="Database" items={["Neon PostgreSQL"]} />
              <TechCard title="Authentication" items={["BetterAuth"]} />
              <TechCard title="Deployment" items={["Vercel"]} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-muted/50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About dev-stage</h2>
              <p className="text-lg mb-6 leading-relaxed">
                dev-stage transforms team collaboration by keeping context within each project. Our vision is to create
                a unified platform where developers can seamlessly manage projects, communicate in real-time, and
                leverage AI assistance to accelerate development workflows.
              </p>
              <p className="text-lg mb-10 leading-relaxed">
                By integrating project management, communication, and AI-powered coding assistance in one place,
                dev-stage eliminates context switching and helps teams stay focused on what matters most: building great
                software together.
              </p>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More About Our Mission <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Development Workflow?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of developers who are already using dev-stage to streamline their projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started for Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">dev-stage</h3>
              <p className="text-muted-foreground">Next-Generation Collaboration for Developers</p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} dev-stage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function TechCard({ title, items }: TechCardProps) {
  return (
    <Card className="h-full">
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
  )
}

