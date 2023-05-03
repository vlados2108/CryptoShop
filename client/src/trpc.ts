import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import type { AppRouter } from "../../server/server";

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
    }),
  ],
});
