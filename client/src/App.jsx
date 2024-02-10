import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DashboardPage from "./Pages/DashboardPage";
import Deposit from "./components/dashboardComponents/Deposit";
import DashboardIndex from "./components/dashboardComponents/DashboardIndex";
import Withdraw from "./components/dashboardComponents/Withdraw";
import Mine from "./components/dashboardComponents/Mine";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/:userId",
      element: <DashboardPage />,
      children: [
        {
          path: "",
          element: <DashboardIndex />,
        },
        {
          path: "deposit",
          element: <Deposit />,
        },
        {
          path: "withdraw",
          element: <Withdraw />,
        },
        {
          path: "mine",
          element: <Mine />,
        },
      ],
    },
  ]);

  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}
