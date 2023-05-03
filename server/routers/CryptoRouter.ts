import { router, publicProcedure } from "../trpc";
import { CryptoService } from "../services/CryptoService";

const cryptoService = new CryptoService();

export const CryptoRouter = router({
    getTopSevenCoins: publicProcedure.query(async ()=>{
      const res = await cryptoService.getTopSevenCoins()
      return res
    })
})