import { router, publicProcedure } from "../trpc";
import { CryptoService } from "../services/CryptoService";
import { Coin, Coin1 } from "../interfaces/Coins";
import { z } from "zod";
const cryptoService = new CryptoService();

export const CryptoRouter = router({
  searchCoins: publicProcedure
    .input(z.string())
    .query(async (req): Promise<Coin[]> => {
      const { input } = req;
      const res = await cryptoService.searchCoins(input);
      return res;
    }),
  getTopSevenCoins: publicProcedure.query(async (): Promise<Coin[]> => {
    const res = await cryptoService.getTopSevenCoins();
    return res;
  }),
});
