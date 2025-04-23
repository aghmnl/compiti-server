import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "done"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
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
