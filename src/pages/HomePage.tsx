import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <Navigate to={"/my-page"} />
  ) : (
    <Navigate to={"/log-in"} />
  );
};

export default HomePage;
