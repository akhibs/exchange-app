import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./../css/Login.module.css";
import settings from "../settings";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pleaseWait, setPleaseWait] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          const login = async () => {
            const url =
              settings.mode === "development"
                ? "http://127.0.0.1:3000/login"
                : "https://sixteenexchange.onrender.com/login";
            setPleaseWait("logging in ");
            const req = await fetch(url, {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
              body: JSON.stringify({
                username: username.toLowerCase(),
                password: password.toLowerCase(),
              }),
            });

            const res = await req.json();

            if (res.status === "user not found") {
              setPleaseWait("Login ");
              setTimeout(() => {
                setErrorMsg("");
              }, 3000);
              setErrorMsg("user does not exist");
            } else {
              Cookie.set("jwt", res.token, { expires: 1 });
              navigate(`/${res.userId}`);
            }
          };
          login();
        }
      },
      []
    );
  });

  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function handleShowPassword() {
    setShowPassword((e) => !e);
  }

  async function handleLogin() {
    const url =
      settings.mode === "development"
        ? "http://127.0.0.1:3000/login"
        : "https://sixteenexchange.onrender.com/login";
    setPleaseWait("logging in ");
    const req = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        username: username.toLowerCase(),
        password: password.toLowerCase(),
      }),
    });

    const res = await req.json();

    if (res.status === "user not found") {
      setPleaseWait("Login ");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      setErrorMsg("user does not exist");
    } else {
      Cookie.set("jwt", res.token, { expires: 1 });
      navigate(`/${res.userId}`);
    }
  }

  return (
    <div className={styles.LoginLayer}>
      <div className={styles.Login}>
        <p className={styles.title}>Log In</p>

        <p className={styles.err}>{errorMsg}</p>
        <p className={styles.label}>username or email</p>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          name="username"
          className={styles.username}
        />

        <p className={styles.label}>password</p>
        <div className={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            name="password"
            className={styles.password}
          />
          <div className={styles.showPassword} onClick={handleShowPassword}>
            {showPassword ? <PiEyeLight /> : <PiEyeSlashLight />}
          </div>
        </div>
        <button onClick={handleLogin} className={styles.loginButton}>
          {pleaseWait}
        </button>
      </div>
    </div>
  );
}
