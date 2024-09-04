import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/log-in"} />;
};

export default PrivateRoute;
