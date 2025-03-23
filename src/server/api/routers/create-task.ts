import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { tasks } from '@/server/db/schema';
import { db } from '@/server/db';
import { eq, and } from 'drizzle-orm';

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
    }),
    updateTaskStatus: protectedProcedure
  .input(
    z.object({
      id: z.number(), 
      status: z.enum(["todo", "in_progress", "completed", "cancelled"]),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Check if task exists and belongs to the user
    const task = await db.select()
      .from(tasks)
      .where(and(eq(tasks.id, input.id), eq(tasks.assignedTo, ctx.userId)))
      ;

    if (!task) {
      throw new Error("Task not found or unauthorized to update");
    }

    // Update the task
    const updatedTask = await db.update(tasks)
      .set({
        status: input.status,
        updatedAt: new Date()
      })
      .where(eq(tasks.id, input.id))
      .returning({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        dueDate: tasks.dueDate,
        priority: tasks.priority,
        status: tasks.status,
        assignedTo: tasks.assignedTo,
        tags: tasks.tags,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt
      })
      .then((result) => result[0]);

    return {
      success: true,
      message: "Task status updated successfully",
      task: updatedTask
    };
  }),
});