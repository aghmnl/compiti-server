import { z } from "zod";

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in progress", "done"]).default("pending"),
});

// Schema for updating an existing task
export const updateTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "in progress", "done"]).optional(),
});

// Schema for deleting a task
export const deleteTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"),
});

// Schema for fetching a single task by ID
export const getTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"),
});
