import { Link } from "react-router-dom";
import styles from "./../css/AuthBox.module.css";

export default function AuthBox() {
  return (
    <div className={styles.AuthBox}>
      <Link to="/login">
        <button className={styles.login}>Log in</button>
      </Link>
      <Link to="/signup">
        <button className={styles.signup}>Sign up</button>
      </Link>
    </div>
  );
}
