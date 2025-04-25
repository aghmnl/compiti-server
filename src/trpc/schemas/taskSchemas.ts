import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  status: z.enum(["pending", "in_progress", "done"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTaskSchema = taskSchema.partial();

export const deleteTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"),
});

export const getTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
