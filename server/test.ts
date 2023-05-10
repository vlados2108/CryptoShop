import { CryptoService } from "./services/CryptoService";
import AccountService from "./services/AccountService";
const cryptoService = new CryptoService();
const accountService = new AccountService()

const a = async () => {
  const result = await accountService.addBalanceToUser(2000,8)
  console.log(result);
};

a();
