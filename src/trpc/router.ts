import { initTRPC } from "@trpc/server";
import { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema, taskSchema } from "./schemas/taskSchemas";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create();

export const appRouter = t.router({
  // Create a new task
  createTask: t.procedure.input(createTaskSchema).mutation(async ({ input, ctx }) => {
    const { title, description, status } = input;
    return await ctx.prisma.task.create({
      data: { title, description, status },
    });
  }),

  // Fetch all tasks. No zod validation needed here
  // since we are not taking any input
  getTasks: t.procedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany();

    // Convert Date fields to strings
    const formattedTasks = tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));

    return taskSchema.array().parse(formattedTasks); // Validate and enforce strict typing
  }),

  // Fetch a specific task by ID
  getTask: t.procedure.input(getTaskSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    return await ctx.prisma.task.findUnique({ where: { id } });
  }),

  // Update an existing task
  updateTask: t.procedure.input(updateTaskSchema).mutation(async ({ input, ctx }) => {
    const { id, title, description, status } = input;
    return await ctx.prisma.task.update({
      where: { id },
      data: { title, description, status },
    });
  }),

  // Delete a task
  deleteTask: t.procedure.input(deleteTaskSchema).mutation(async ({ input, ctx }) => {
    const { id } = input;
    return await ctx.prisma.task.delete({ where: { id } });
  }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
