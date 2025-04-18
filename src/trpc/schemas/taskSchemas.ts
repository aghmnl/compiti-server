import { z } from "zod";

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title is required
  description: z.string().optional(), // Description is optional
  status: z.enum(["pending", "in progress", "done"]).default("pending"), // Enum for status
});

// Schema for updating an existing task
export const updateTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"), // ID is required for updates
  title: z.string().min(1, "Title is required").optional(), // Title is optional for updates
  description: z.string().optional(), // Description is optional
  status: z.enum(["pending", "in progress", "done"]).optional(), // Status is optional
});

// Schema for deleting a task
export const deleteTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"), // ID is required for deletion
});

// Schema for fetching a single task by ID
export const getTaskSchema = z.object({
  id: z.number().int().positive("Task ID must be a positive integer"), // ID is required for fetching
});
