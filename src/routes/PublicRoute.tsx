import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const isAuthenticated = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/my-page"} />;
};

export default PublicRoute;
