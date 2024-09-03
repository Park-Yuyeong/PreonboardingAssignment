import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import MyPage from "../pages/MyPage";
import SignUpPage from "../pages/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <LogInPage />,
        path: "/log-in",
      },
      {
        element: <SignUpPage />,
        path: "/sign-up",
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MyPage />,
        path: "/my-page",
      },
    ],
  },
]);

export default router;
