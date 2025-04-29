import { initTRPC } from "@trpc/server";
import { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema, taskSchema } from "./schemas/taskSchemas";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create();

export const appRouter = t.router({
  createTask: t.procedure.input(createTaskSchema).mutation(async ({ input, ctx }) => {
    const { title, description, status } = input;
    return await ctx.prisma.task.create({
      data: { title, description, status },
    });
  }),

  getTasks: t.procedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany();

    const formattedTasks = tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));

    return taskSchema.array().parse(formattedTasks);
  }),

  getTask: t.procedure.input(getTaskSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    return await ctx.prisma.task.findUnique({ where: { id } });
  }),

  updateTask: t.procedure.input(updateTaskSchema).mutation(async ({ input, ctx }) => {
    const { id, title, description, status } = input;
    return await ctx.prisma.task.update({
      where: { id },
      data: { title, description, status },
    });
  }),

  deleteTask: t.procedure.input(deleteTaskSchema).mutation(async ({ input, ctx }) => {
    const { id } = input;
    return await ctx.prisma.task.delete({ where: { id } });
  }),
});

export type AppRouter = typeof appRouter;
