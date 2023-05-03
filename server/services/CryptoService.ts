import axios from "axios";

export class CryptoService {
  async getTopSevenCoins() {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending "
    );
    const coins = res.data.coins.map((coin:any) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc,
      };
    });
    const coinsArray = Object.values(coins);
    console.log(typeof coinsArray)
    return coins;
  }
}
