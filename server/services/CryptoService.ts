import axios from "axios";
import { Coin, Coin1 } from "../interfaces/Coins";
export class CryptoService {
  async getTopSevenCoins(): Promise<Array<Coin>> {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending "),
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
    ]);

    const btcPrice = btcRes.data.bitcoin.usd

    const coins = res.data.coins.map((coin: any) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: (coin.item.price_btc).toFixed(10),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(10)
      };
    });
    const coinsArray = Object.values(coins);
    console.log(typeof coinsArray);
    return coins;
  }

  async searchCoins(search: String): Promise<Array<Coin>> {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${search}`
    );
    const coins = res.data.coins.map((coin: any) => {
      return {
        name: coin.name,
        image: coin.large,
        id: coin.id,
        priceBtc: 0,
        priceUsd: 0,
      };
    });
    return coins;
  }
}
