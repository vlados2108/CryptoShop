import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";

// dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();

app.use(cors({ origin: "*" }));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(5000, () => {
  console.log(`server running on port 5000`);
});

export type AppRouter = typeof appRouter;
