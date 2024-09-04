import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
