import React from "react";
import { Link } from "react-router-dom";
import s from '../styles/style.module.scss' 
interface IProps {
  coin: any;
  userId: number
}
export default function ListItem(props: IProps) {
  return (
    <div className={s.home_crypto}>
      <Link to={`/${props.userId}/${props.coin.id}`}>
        <span className={s.home_crypto_image}>
          <img src={props.coin.image} />
        </span>
        <span className={s.home_crypto_name}>{props.coin.name}</span>
        {
          props.coin.priceBtc && 
          <span className={s.home_crypto_prices}>
            <span className={s.home_crypto_btc}>
              <img src="/bitcoin.webp" />
              {props.coin.priceBtc} BTC
            </span>
            <span className={s.home_crypto_usd}>{props.coin.priceUsd} USD</span>
          </span>
        }
      </Link>
    </div>
  );
}
