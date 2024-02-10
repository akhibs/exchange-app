import styles from "./../../css/dashboard/CoinTile.module.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import CoinContext from "../../context/CoinContext";

export default function CoinTile() {
  const context = useContext(CoinContext);

  const [change, setChange] = useState("");

  useEffect(() => {
    if (Number(context.data.price) > Number(context.lastPrice)) {
      setChange("up");
    } else if (Number(context.data.price) < Number(context.lastPrice)) {
      setChange("down");
    }
  }, [context.data.price, context.lastPrice]);

  return (
    <div className={styles.CoinTile}>
      <div className={styles.logoBox}>
        <img src={context.data.logo} className={styles.logo} />
      </div>

      <div className={styles.name}>
        <p>{context.data.name}</p>
        <p>{context.data.alias}</p>
      </div>
      <div
        className={styles.price}
        style={{
          color: `${
            change === "down" ? "rgb(197, 36, 63)" : "rgb(36, 197, 84)"
          }`,
        }}
      >
        <p>${context.data.price}</p>
        <p>{change === "down" ? <FaArrowDown /> : <FaArrowUp />}</p>
      </div>
    </div>
  );
}
