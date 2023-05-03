import { router } from "./trpc";
import {CryptoRouter} from "./routers/CryptoRouter"
export const appRouter = router({
    CryptoRouter: CryptoRouter
});

export type AppRouter = typeof appRouter;
