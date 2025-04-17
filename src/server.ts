import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
