import React from "react";
import { useParams } from "react-router-dom";
import { trpc } from "../trpc";
export default function MyCoins() {
  const params = useParams();
  const getUserCoins = trpc.AccountRouter.getUserCoins.useQuery(
    parseInt(params.userId!)
  );
  if (getUserCoins.isLoading)
    return (<>Loading...</>)
    
  console.log(getUserCoins.data);

  return <div></div>;
}
