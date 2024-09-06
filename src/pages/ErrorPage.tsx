import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Page from "../components/common/Page";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClickGoToLogInPage = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <Page title="Error!">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h3 className="font-semibold text-xl">
          서비스 이용 중 문제가 발생했습니다. 재로그인 후 서비스를 이용해주세요.
        </h3>
        <Button onClick={handleClickGoToLogInPage}>재로그인하기</Button>
      </div>
    </Page>
  );
};

export default ErrorPage;
