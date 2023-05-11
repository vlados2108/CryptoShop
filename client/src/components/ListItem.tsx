import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "../styles/style.module.scss";
import { Button } from "react-bootstrap";
import Modal from "../Modal/Modal";
import { trpc } from "../trpc";
interface IProps {
  coin: any;
  userId: number;
}
export default function ListItem(props: IProps) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [countSell,setCountSell] = useState(1)
  const sellCoinMutation = (trpc.AccountRouter as any).sellCoin.useMutation()
  const sellCoin = ()=>{
    sellCoinMutation.mutate({userId: props.userId,coinName: props.coin.name,coinPrice:props.coin.price,count:countSell})
    setCountSell(1)
    setIsActiveModal(false)
  }
  console.log(props.coin.count);
  return (
    <div className={s.home_crypto}>
      <Link
        to={
          props.coin.count
            ? `/${props.userId}/${props.coin.name}`
            : `/${props.userId}/${props.coin.id}`
        }
      >
        <span className={s.home_crypto_image}>
          <img src={props.coin.image} />
        </span>
        <span className={s.home_crypto_name}>{props.coin.name}</span>
        {props.coin.priceBtc && (
          <span className={s.home_crypto_prices}>
            <span className={s.home_crypto_btc}>
              <img src="/bitcoin.webp" />
              {props.coin.priceBtc} BTC
            </span>
            <span className={s.home_crypto_usd}>{props.coin.priceUsd} USD</span>
          </span>
        )}
        {props.coin.count && (
          <span className={s.home_crypto_btc}>Count: {props.coin.count}</span>
        )}
      </Link>
      {props.coin.count && (
        <Button
          className={s.buyBtn}
          onClick={() => {
            setIsActiveModal(true);
          }}
        >
          Sell
        </Button>
      )}
      <Modal active={isActiveModal} setActive={setIsActiveModal}>
        <input
          placeholder="Amount"
          className={s.numOfCoinsInput}
          onChange={(e) => {
            setCountSell(parseInt(e.target.value));
          }}
        />
        <Button className={s.buyBtn} onClick={sellCoin}>
          Confirm
        </Button>
      </Modal>
    </div>
  );
}
