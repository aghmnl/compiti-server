import { initTRPC } from "@trpc/server";
import { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema } from "./schemas/taskSchemas";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create();

export const appRouter = t.router({
  // Create a new task
  createTask: t.procedure.input(createTaskSchema).mutation(async ({ input, ctx }) => {
    const { title, description, status } = input;
    const task = await ctx.prisma.task.create({
      data: { title, description, status },
    });
    return task;
  }),

  // Fetch all tasks
  getTasks: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany();
  }),

  // Fetch a single task by ID
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
