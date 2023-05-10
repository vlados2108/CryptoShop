import { router } from "./trpc";
import {CryptoRouter} from "./routers/CryptoRouter"
import {AccountRouter} from "./routers/AccountRouter"
export const appRouter = router({
    CryptoRouter: CryptoRouter,
    AccountRouter: AccountRouter,
});

export type AppRouter = typeof appRouter;
