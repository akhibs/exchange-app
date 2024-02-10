import { useContext } from "react";
import styles from "./../../css/dashboard/DashboardIndex.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Coins from "./Coins";
import DashboardContext from "../../context/DashboardContext";

export default function DashboardIndex() {
  const context = useContext(DashboardContext);
  const navigate = useNavigate();
  const { userId } = useParams();

  function handleDeposit() {
    navigate(`/${userId}/deposit`);
  }

  function handleWithdraw() {
    navigate(`/${userId}/withdraw`);
  }

  function handleMine() {
    navigate(`/${userId}/mine`);
  }

  return (
    <>
      <div className={styles.accountDetails}>
        <div className={styles.balance}>
          <p className={styles.balanceInner}>
            <span className={styles.balanceTitle}>balance: </span>
            <span className={styles.mainBalance}>{context.balance}</span>
            <span className={styles.cur}>usdt</span>
          </p>
        </div>
        <div className={styles.activities}>
          <button className={styles.deposit} onClick={handleDeposit}>
            deposit
          </button>
          <button className={styles.withdraw} onClick={handleWithdraw}>
            withdraw
          </button>
          <button className={styles.mine} onClick={handleMine}>
            mine usdt
          </button>
        </div>
        <div className={styles.miniDetails}>
          <p className={styles.plan}>plan: {context.plan}</p>
          <p className={styles.assets}>total assets: {"assets"}</p>
          <p className={styles.profit}>profit: {context.profit}</p>
          <p className={styles.mineStatus}>mine status: {context.mineStatus}</p>
        </div>
      </div>
      <Coins />
    </>
  );
}
