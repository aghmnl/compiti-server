import express from "express";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context"; // Import the context
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON
app.use(express.json());

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext, // Use the context here
  })
);

app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
    },
  });
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle Prisma disconnection on server shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

// Listen for termination signals
process.on("SIGINT", shutdown); // Handle Ctrl+C
process.on("SIGTERM", shutdown); // Handle termination signal
