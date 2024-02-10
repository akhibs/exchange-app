import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import styles from "./../css/Signup.module.css";
import countries from "./../utilities/countryData";
import settings from "../settings";

//country and codes obj==============

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [pleaseWait, setPleaseWait] = useState("Create Account");

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (
          password < 8 ||
          password !== confirmPassword ||
          email.length < 1 ||
          username.length < 1 ||
          dateOfBirth.length < 1 ||
          country.length < 1 ||
          phoneNumber.length < 1
        ) {
          setTimeout(() => {
            setEmailErrorMsg("");
          }, 3000);
          setEmailErrorMsg("enter your information");
          return;
        } else {
          const signup = async () => {
            const url =
              settings.mode === "development"
                ? "http://127.0.0.1:3000/signup"
                : "https://sixteenexchange.onrender.com/signup";

            setPleaseWait("please wait ... ");

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
                password: password,
                email: email.toLowerCase(),
                dateOfBirth: dateOfBirth.toLowerCase(),
                country: country.toLowerCase,
                phoneNumber: phoneNumber.toLowerCase(),
              }),
            });

            const res = await req.json();

            if (res.status === "email already in use") {
              setPleaseWait("Create Account");
              setTimeout(() => {
                setEmailErrorMsg("");
              }, 3000);
              setEmailErrorMsg("email already in use");
            } else if (res.status === "username already in use") {
              setPleaseWait("Create Account ");
              setTimeout(() => {
                setUsernameErrorMsg("");
              }, 3000);
              setUsernameErrorMsg("username already in use");
            } else {
              Cookie.set("jwt", res.token, { expires: 1 });
              navigate(`/${res.userId}`);
            }
          };
          signup();
        }
      }
    });
  }, [
    confirmPassword,
    country.length,
    dateOfBirth,
    email.length,
    password,
    phoneNumber.length,
    username.length,
    country.toLowerCase,
    email,
    navigate,
    phoneNumber,
    username,
  ]);

  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      regex.test(e.target.value.toLowerCase())
        ? setEmailErrorMsg("")
        : setEmailErrorMsg("invalid email");
    } else if (e.target.name === "dateOfBirth") {
      setDateOfBirth(e.target.value);
    } else if (e.target.name === "country") {
      setCountry(e.target.value);
    } else if (e.target.name === "phoneNumber") {
      setPhoneNumber(e.target.value);
    }
  }

  async function handleSignup() {
    const url =
      settings.mode === "development"
        ? "http://127.0.0.1:3000/signup"
        : "https://sixteenexchange.onrender.com/signup";

    setPleaseWait("please wait ... ");

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
        password: password,
        email: email.toLowerCase(),
        dateOfBirth: dateOfBirth.toLowerCase(),
        country: country.toLowerCase,
        phoneNumber: phoneNumber.toLowerCase(),
      }),
    });

    const res = await req.json();

    if (res.status === "email already in use") {
      setPleaseWait("Create Account");
      setTimeout(() => {
        setEmailErrorMsg("");
      }, 3000);
      setEmailErrorMsg("email already in use");
    } else if (res.status === "username already in use") {
      setPleaseWait("Create Account ");
      setTimeout(() => {
        setUsernameErrorMsg("");
      }, 3000);
      setUsernameErrorMsg("username already in use");
    } else {
      Cookie.set("jwt", res.token, { expires: 1 });
      navigate(`/${res.userId}`);
    }
  }

  return (
    <div className={styles.SignupLayer}>
      <div className={styles.Signup}>
        <div className={styles.SignupLayer2}>
          <p className={styles.title}>join us!</p>
          <p className={styles.label}>email</p>
          <input
            type="text"
            value={email}
            onChange={handleChange}
            name="email"
            className={styles.email}
            placeholder="example@email.com"
          />
          <p className={styles.err}>{emailErrorMsg}</p>

          <p className={styles.label}>Date of Birth</p>
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleChange}
            name="dateOfBirth"
            className={styles.dateOfBirth}
          />

          <p className={styles.label}>country of residence</p>
          <select
            className={styles.country}
            name="country"
            placeholder="select"
            onChange={handleChange}
          >
            <option className={styles.options} value={"...select country"}>
              ...select country
            </option>
            {countries.map((el) => {
              return (
                <option
                  className={styles.options}
                  key={el.country}
                  value={el.country}
                >
                  {el.country}
                </option>
              );
            })}
          </select>

          <p className={styles.label}>phone number</p>
          <div className={styles.phoneBox}>
            <p className={styles.flag}>
              {countries.map((el) => {
                if (el.country === country) {
                  return el.flag;
                }
              })}
            </p>
            <p className={styles.code}>
              {" "}
              {countries.map((el) => {
                if (el.country === country) {
                  return el.code;
                }
              })}
            </p>
            <input
              className={styles.phoneNumber}
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
          </div>

          <p className={styles.label}>username</p>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            name="username"
            className={styles.username}
          />
          <p className={styles.err}>{usernameErrorMsg}</p>

          <p className={styles.label}>password</p>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            className={styles.password}
          />
          {password.length > 0 ? (
            password.length < 8 ? (
              <>
                <p className={styles.err}>password must be 8 character long</p>
                <p className={styles.err}>weak password</p>
              </>
            ) : (
              <p className={styles.err2}>strong</p>
            )
          ) : (
            <p className={styles.err}></p>
          )}

          <p className={styles.label}>confirm password</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            className={styles.confirmPassword}
          />
          {confirmPassword.length > 0 ? (
            password !== confirmPassword ? (
              <p className={styles.err}>password does not match</p>
            ) : (
              <p className={styles.err2}>match ✔</p>
            )
          ) : (
            <p className={styles.err}></p>
          )}

          <div className={styles.agreement}>
            <input type="checkbox" />
            <p>
              I agree to the terms and conditions that apply in the{" "}
              <Link to="#">Policy</Link>
            </p>
          </div>

          {password < 8 ||
          password !== confirmPassword ||
          email.length < 1 ||
          username.length < 1 ||
          dateOfBirth.length < 1 ||
          country.length < 1 ||
          phoneNumber.length < 1 ? (
            <button
              disabled
              className={styles.signupButtonDisabled}
              onClick={handleSignup}
            >
              Create Account
            </button>
          ) : (
            <button className={styles.signupButton} onClick={handleSignup}>
              {pleaseWait}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
