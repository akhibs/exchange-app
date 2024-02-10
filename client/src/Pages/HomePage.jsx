import HomePageHeader from "../components/HomePageHeader";
import styles from "./../css/HomePage.module.css";
import { useEffect } from "react";
import settings from "../settings";

export default function HomePage() {
  const url =
    settings.mode === "development"
      ? "http://127.0.0.1:3000/awake"
      : "https://sixteenexchange.onrender.com/awake";

  useEffect(() => {
    fetch(url);
  }, [url]);

  return (
    <div className={styles.HomePage}>
      <HomePageHeader />
    </div>
  );
}
