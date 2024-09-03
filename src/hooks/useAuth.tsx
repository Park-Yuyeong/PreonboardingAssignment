import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // 여기 JWT 토큰을 체크하는 로직을 추가할 것!
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  });

  return isAuthenticated;
};

export default useAuth;
