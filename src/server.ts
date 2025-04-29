import express from "express";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router";
import { createContext, disconnectPrisma } from "./trpc/context";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.SERVER_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.SERVER_URL}`);
});

const shutdown = async () => {
  console.log("Shutting down server...");
  await disconnectPrisma();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown); // Handle Ctrl+C
process.on("SIGTERM", shutdown); // Handle termination signal
