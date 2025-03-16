import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { projectMembers, projects } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(z.object({
            name: z.string().min(5, "Project name must contain atleast 5 characters"),
            description: z.string().min(10, "Project descriptin must contain atleast 10 characters"),
            githubRepoLink: z.string().url("Invalid Repository link or your repo must be private").optional(),
            status: z.enum(["active", "completed", "archived"]).default("active"),
            startDate: z.string().optional(),
            targetCompletionDate: z.string().optional(),
            tags: z.array(z.string()).optional(),
            members: z.array(z.object({
                userId: z.string(),
                role: z.enum(["admin","reviewer","member"]).default("member")
            })).optional(),
        }))
        .mutation(async({ctx, input}) => {
            const ownerId = ctx.session.user.id;
            // by default keeping the creator of the project as the owner of the project so that it will be easy for us to handle the github repo even though it is private
            return await db.transaction(async(tx) => {
                const newProject = await tx.insert(projects).values({
                    name: input.name,
                    description: input.description,
                    githubRepoLink: input.githubRepoLink,
                    ownerId: ownerId,
                    status: input.status,
                    targetCompletionDate: input.targetCompletionDate ? new Date(input.targetCompletionDate) : null,
                    createdAt: new Date(),
                }).returning();

                if(!newProject.length || !newProject[0]){
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create a project check for some error"
                    })
                }

                const projectId = String(newProject[0].id);

                await tx.insert(projectMembers).values({
                    projectId: projectId,
                    userId: ownerId,
                    role: "admin",
                    joinedAt: new Date()
                })

                return {
                    success: true,
                    message: "Project Created Successfully",
                    project: newProject[0]
                }
            })
        })
})