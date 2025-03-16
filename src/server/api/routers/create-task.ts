import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { tasks } from '@/server/db/schema';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

export const taskRouter = createTRPCRouter({
    createTask: protectedProcedure
    .input(z.object({
        title: z.string().min(3, "Title must be atleast 3 characters long"),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        priority: z.enum(["low", "medium", "high"]),
        status: z.enum(["todo","in_progress","completed","archived"]).default("todo"),
        assignedTo: z.string().optional(),
        tags: z.array(z.string()).optional(),
        projectId: z.string().optional(),
    }))
    .mutation(async ({ctx, input}) => {
        const userId = ctx.session.user.id;
        const newTask = await db.insert(tasks).values({
            title: input.title,
            description: input.description,
            dueDate: input.dueDate ? new Date(input.dueDate): null,
            priority: input.priority,
            status: input.status,
            assignedTo: input.assignedTo ?? userId,
            tags: input.tags ?? [],
            projectId: input.projectId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();
        return {
            success: "True",
            message: "Task added successfully",
            task: newTask[0]
        }
    }),
    getTasksAssignedToUser: protectedProcedure
    .query(async ({ctx}) => {
        const assignedTasks = await db.select()
            .from(tasks)
            .where(eq(tasks.assignedTo, ctx.userId));
        
        return assignedTasks;
    })
});