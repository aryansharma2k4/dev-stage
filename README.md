# dev-stage

**dev-stage** is a next-generation collaboration platform tailored for development teams. It seamlessly combines project management, real-time chatrooms with advanced AI integration, and task tracking—keeping your team's context intact and collaboration efficient.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

dev-stage is designed to bring developers closer together. Whether you're brainstorming in chatrooms or tracking pending tasks (think Jira tickets), dev-stage keeps everything organized under a single project context. One of its standout capabilities is the ability to reference your entire codebase directly within conversations via hooks like `@codebase`—integrating your GitHub repository to provide AI-powered insights that remain contextually aware.

---

## Features

- **Project & Team Management**
  - Create and manage projects with ease.
  - Add collaborators and organize teams for each project.

- **Dynamic Chatrooms**
  - Hold multiple chatrooms per project for focused discussions.
  - Use AI-powered chat that supports all kinds of prompts.
  - Reference your entire codebase with the `@codebase` hook to supply context to AI responses.

- **Task Management**
  - Manage pending tasks using a system similar to Jira tickets.
  - Track progress, complete tasks, and stay organized.

- **AI-Driven Assistance**
  - Choose between advanced chatbot options including Gemini 2.0 Flash Extended Thinking, GPT-4, Claude, etc.
  - Benefit from agentic AI capabilities that can propose and commit code changes (similar to tools like Cursor) by pushing updates to a new branch.

- **Modern & Intuitive UI**
  - Sleek design built with shadcnUI and TailwindCSS.
  - Designed for an intuitive user experience.

- **Secure & Scalable Deployment**
  - Authentication managed by BetterAuth.
  - Backend powered by Next.js, tRPC, Drizzle ORM, and Zustand for state management.
  - Neon PostgreSQL for a robust database solution.
  - Deployed seamlessly on Vercel.

---

## Tech Stack

- **Frontend:** Next.js, shadcnUI, TailwindCSS
- **State Management:** Zustand
- **Backend:** tRPC, Next.js API routes, Drizzle ORM
- **Database:** Neon PostgreSQL
- **Authentication:** BetterAuth
- **Project Initialization:** Create T3 App
- **AI Integration:** Gemini 2.0 Flash, GPT-4o mini
- **Deployment:** Vercel
