import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  // To use POST method, we need to use mutation
  // POST http://localhost:3000/trpc/hello
  // body: {"name":"World"}
  // Content-Type: application/json
  hello: t.procedure.input(z.object({ name: z.string() })).mutation(({ input }) => {
    return { message: `Hello, ${input.name}!` };
  }),
  // To use GET method, we need to use query
  // GET http://localhost:3000/trpc/hi?input={"name":"World"}
  // Content-Type: application/json
  hi: t.procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return { message: `Hi, ${input.name}!` };
  }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
