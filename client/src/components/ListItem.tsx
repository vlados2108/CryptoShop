import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  coin: any;
}
export default function ListItems(props: IProps) {
  return (
    <div className="home-crypto">
      <Link to={`/${props.coin.id}`}>
        <span className="home-crypto-image">
          <img src={props.coin.image} />
        </span>
        <span className="home-crypto-name">{props.coin.name}</span>
        {
          props.coin.priceBtc && 
          <span className="home-crypto-prices">
            <span className="home-crypto-btc">
              <img src="/bitcoin.webp" />
              {props.coin.priceBtc} BTC
            </span>
            <span className="home-crypto-usd">{props.coin.priceUsd} USD</span>
          </span>
        }
      </Link>
    </div>
  );
}
