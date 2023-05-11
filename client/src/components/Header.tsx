import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "../styles/style.module.scss";
import { trpc } from "../trpc";
import { Button } from "react-bootstrap";
import Modal from "../Modal/Modal";
interface IProps {
  back: boolean;
  userId: number;
}
export default function Header(props: IProps) {
  const [modalActive, setModalActive] = useState(false);
  const [money, setMoney] = useState(0);
  const balance = trpc.AccountRouter.getUserBalance.useQuery(props.userId);
  const addBalanceRes = trpc.AccountRouter.addBalanceToUser.useMutation();
  const addBalance = () => {
    addBalanceRes.mutate({ money, userId: props.userId });
    setMoney(0)
    setModalActive(false)
  };

  return (
    <div>
      <header className={s.header}>
        <div className={s.width}>
          {props.back && (
            <Link to={`/Home/${props.userId}`} className={s.backLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z"
                />
              </svg>
            </Link>
          )}
          <h1 className={s.appName}>
            <Link to={`/Home/${props.userId}`}>CryptoShop!</Link>
          </h1>
          <div className={s.account}>
            <Button
              id="addBtn"
              className={s.addToWallet}
              onClick={() => {
                setModalActive(true);
              }}
            >
              +
            </Button>
            {/* <div id="myModal" className={s.myModal}>
            <div className={s.modalContent}>
              <span className={s.close}>&times;</span>
              <p>Modal window</p>
            </div>
          </div> */}
            <div className={s.balance}>{balance.data}$</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                width="24"
                height="24"
                onClick={()=>{ window.location.href = `/${props.userId}/myCoins`}}
              >
                <path
                  fill="currentColor"
                  d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z"
                />
              </svg>
            </div>
            <div>
              <Link to={`/`}>Log out</Link>
            </div>
          </div>
        </div>
      </header>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={s.buyBtnContainer}>
          <input
            placeholder="Amount"
            className={s.numOfCoinsInput}
            onChange={(e) => {
              setMoney(parseInt(e.target.value));
            }}
          ></input>
          <Button className={s.buyBtn} onClick={addBalance}>
            Refill
          </Button>
        </div>
      </Modal>
    </div>
  );
}
