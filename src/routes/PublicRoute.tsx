import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/my-page"} />;
};

export default PublicRoute;
