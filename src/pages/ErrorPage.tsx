import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

interface ErrorPageProps {
  message: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleClickGoToLogInPage = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <h3 className="font-semibold text-xl">{message}</h3>
      <Button onClick={handleClickGoToLogInPage}>서비스로 돌아가기</Button>
    </div>
  );
};

export default ErrorPage;
