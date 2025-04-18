import express from "express";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router";
import { createContext, disconnectPrisma } from "./trpc/context";

dotenv.config();

const app = express();

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle Prisma disconnection on server shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await disconnectPrisma();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

// Listen for termination signals
process.on("SIGINT", shutdown); // Handle Ctrl+C
process.on("SIGTERM", shutdown); // Handle termination signal
