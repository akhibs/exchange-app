import styles from "./../css/HomePageHeader.module.css";
import { FaAngleRight } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthBox from "./AuthBox";
import { Link } from "react-router-dom";

export default function HomePageHeader() {
  return (
    <div className={styles.HomePageHeader}>
      <div className={styles.hamburger}>
        <RxHamburgerMenu />
      </div>

      <Link to="/">
        <img src="/sixteen-logo.png" className={styles.logo} />
      </Link>
      <div className={styles.menu}>
        <p>
          Home
          <span>
            <FaAngleRight />
          </span>
        </p>
        <p>
          Pricing
          <span>
            <FaAngleRight />
          </span>
        </p>
        <p>
          Our Services
          <span>
            <FaAngleRight />
          </span>
        </p>
        <p>
          About
          <span>
            <FaAngleRight />
          </span>
        </p>
      </div>
      <AuthBox />
    </div>
  );
}
