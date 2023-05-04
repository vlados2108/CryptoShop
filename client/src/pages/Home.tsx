import { useEffect, useState } from "react";
import { trpc } from "../trpc";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "ts-debounce";
import {Coin,Coin1} from "../../../server/interfaces/Coins"

export default function Home() {
  const coinsQ = trpc.CryptoRouter.getTopSevenCoins.useQuery()
  //const searchFunc = trpc.CryptoRouter.searchCoins.useQuery
  const [search, setSearch] = useState("");
  const [coins,setCoins] = useState(coinsQ.data);
  useEffect(()=>{
    setCoins(coinsQ.data)
    
  },[coinsQ.data])

  if (coinsQ.isLoading) {
    return <>Loading...</>;
  }

  const searchCoins = debounce(async ()=>{
    if (search.length > 2){
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const coinsTemp = res.data.coins.map((coin:any)=>{
        return{
          name:coin.name,
          image:coin.large,
          id: coin.id 
        }
      })
      setCoins(coinsTemp)
    }else{
      setCoins(coinsQ.data)
    }
   
  }, 500);

  console.log(coins)
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchCoins();
        }}
      />
      {Array.isArray(coins) &&
        coins?.map((coin: any) => {
          return (
            <div key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name}</Link>
            </div>
          );
        })}
    </div>
  );
}
