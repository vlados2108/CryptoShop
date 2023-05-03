import { useEffect, useState } from "react";
import { trpc } from "../trpc";
import { Link } from "react-router-dom";
export default function Home() {
  const coins = trpc.CryptoRouter.getTopSevenCoins.useQuery();

  if (coins.isLoading) {
    return <>Loading...</>;
  }
  //console.log(coins.data)
  if (Array.isArray(coins)) {
    console.log("true");
  }

  console.log(coins.data);

  return (
    <div>
      {Array.isArray(coins.data) && coins.data?.map((coin: any) => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
