import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { ErrorResponse, LogInRequest } from "../../types/auth.type";
import Button from "../common/Button";
import Input from "../common/Input";

const LogInForm = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: logIn } = useMutation({
    mutationFn: (data: LogInRequest) => api.auth.logIn(data),
    onSuccess: () => {
      alert("로그인에 성공했습니다!");
      navigate("/my-page");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(error.response?.data.message);
    },
  });

  const handleSubmitLogInForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    logIn({
      id: userId,
      password,
    });
  };

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmitLogInForm}>
      <div className="flex flex-col gap-y-4">
        <Input
          type="text"
          label="아이디"
          value={userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
        />
        <Input
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div className="flex gap-x-2">
        <Button
          priority={"secondary"}
          type="button"
          onClick={() => navigate("/sign-up")}
        >
          회원가입 하러가기
        </Button>
        <Button type="submit">로그인하기</Button>
      </div>
    </form>
  );
};

export default LogInForm;
