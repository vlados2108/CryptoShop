import { useEffect, useState } from "react";
import { trpc } from "../trpc";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "ts-debounce";
import { Coin, Coin1 } from "../../../server/interfaces/Coins";
import Header from "../components/Header";
import ListItems from "../components/ListItem";
import ListItem from "../components/ListItem";
import classNames from "classnames";

export default function Home() {
  const coinsQ = trpc.CryptoRouter.getTopSevenCoins.useQuery();
  //const searchFunc = trpc.CryptoRouter.searchCoins.useQuery
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState(coinsQ.data);
  const [searching,setSearching] = useState(false)
  const [searched,setSearched] = useState(false)
  useEffect(() => { 
    setCoins(coinsQ.data);
  }, [coinsQ.data]);

  if (coinsQ.isLoading) {
    return <>Loading...</>;
  }

  const searchCoins = debounce(async () => {
    setSearching(true)
    if (search.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const coinsTemp = res.data.coins.map((coin: any) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });
      setCoins(coinsTemp);
      setSearching(false)
      setSearched(true)
    } else {
      setCoins(coinsQ.data);
      setSearching(false)
      setSearched(false)
    }
  }, 500);

  console.log(coins);
  return (
    <div>
      <Header back={false} />
      <header className="home-search">
        <div className="width">
          <h2>Search for a coin</h2>
          <div className={classNames("home-search-input",{searching: searching})}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchCoins();
              }}
            />
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20"><path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
          </div>
        </div>
      </header>
      <div className="home-cryptos">
        <div className="width">
          <h2>{searched? 'Search results' : 'Trending coins'}</h2>
          <div className="home-cryptos-list">
            {Array.isArray(coins) &&
              coins?.map((coin: any) => {
                return (
                  <div key={coin.id}>
                    <ListItem key={coin.id} coin={coin} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
