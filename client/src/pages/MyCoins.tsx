import React from "react";
import { useParams } from "react-router-dom";
import { trpc } from "../trpc";
import s from "../styles/style.module.scss";
import ListItem from "../components/ListItem";
import Header from "../components/Header";

export default function MyCoins() {
  const params = useParams();
  const getUserCoins = trpc.AccountRouter.getUserCoins.useQuery(
    parseInt(params.userId!)
  );
  if (getUserCoins.isLoading) return <>Loading...</>;

  console.log(getUserCoins.data);

  return (
    <div>
      <Header back userId={parseInt(params.userId!)} />
      <div className={s.myCoinsContainer}>
        <div className={s.home_cryptos}>
          <div className={s.width}>
            <h2>My Coins</h2>
            <div className={s.home_cryptos_list}>
              {Array.isArray(getUserCoins.data) &&
                getUserCoins.data?.map((coin: any) => {
                  return (
                    <div key={coin.id}>
                      <ListItem
                        key={coin.id}
                        coin={coin}
                        userId={parseInt(params.userId!)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
