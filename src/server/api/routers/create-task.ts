import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { tasks } from '@/server/db/schema';
import { db } from '@/server/db';

export const taskRouter = createTRPCRouter({
    createTask: publicProcedure
    .input(z.object({
        title: z.string().min(3, "Title must be atleast 3 characters long"),
        description: z.string().optional(),
        dueData: z.string().optional(),
        priority: z.enum(["low", "medium", "high"])
    }))
    .mutation(async ({input}) => {
        const newTask = await db.insert(tasks).values({
            title: input.title,
            description: input.description,
            dueDate: input.dueData ? new Date(input.dueData): null,
            priority: input.priority,
        }).returning();
        return {
            success: "True",
            message: "Task added successfully",
            task: newTask[0]
        }
    })
})