import { CryptoService } from "./services/CryptoService";

const cryptoService = new CryptoService();

const a = async () => {
  const result = await cryptoService.getTopSevenCoins();
  console.log(result);
};

a();
