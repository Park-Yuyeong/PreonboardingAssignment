import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Navigate to={"/my-page"} />
  ) : (
    <Navigate to={"/log-in"} />
  );
};

export default HomePage;
