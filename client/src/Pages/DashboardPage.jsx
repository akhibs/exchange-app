import { useEffect, useReducer } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import protect from "../utilities/protect";
import DashboardContext from "../context/DashboardContext";
import styles from "./../css/dashboard/Dashboard.module.css";

const initialState = {
  username: "",
  balance: 0,
  plan: "",
  profit: 0,
  mineStatus: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "balance":
      return { ...state, balance: action.payload };
    case "plan":
      return { ...state, plan: action.payload };
    case "profit":
      return { ...state, profit: action.payload };
    case "mineStatus":
      return { ...state, mineStatus: action.payload };

    default:
      break;
  }
}

export default function DashboardPage() {
  //INITIAL VARIABLES=======================================
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userId } = useParams();
  const token = Cookie.get("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = protect(userId, token);
    validateUser.then((e) => {
      if (e.status === "bad") {
        navigate("/login");
      }
      dispatch({ type: "username", payload: e.username });
      dispatch({ type: "balance", payload: e.balance });
      dispatch({ type: "plan", payload: e.plan });
      dispatch({ type: "profit", payload: e.profit });
      dispatch({ type: "mineStatus", payload: e.mineStatus });
    });
  }, [navigate, token, userId]);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLayer}>
        <DashboardContext.Provider value={state}>
          <p className={styles.greeting}>Hi there, {state.username} 👋🏻</p>
          <Outlet userId={userId}/>
        </DashboardContext.Provider>
      </div>
    </div>
  );
}
