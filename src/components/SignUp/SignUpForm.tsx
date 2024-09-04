import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { useToast } from "../../providers/ToastProvider";
import { ErrorResponse, RegisterRequest } from "../../types/auth.type";
import Button from "../common/Button";
import Input from "../common/Input";

const SignUpForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [userId, setUserId] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { mutate: signUp } = useMutation({
    mutationFn: (data: RegisterRequest) => api.auth.signUp(data),
    onSuccess: () => {
      toast.on({ label: "회원가입을 완료했습니다. 로그인을 진행해주세요!" });
      navigate("/log-in");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.on({
        label: error.response?.data.message || "회원가입에 실패했습니다.",
        state: "danger",
      });
    },
  });

  const handleSubmitSignUpForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (password === confirmPassword) {
      signUp({ id: userId, nickname, password });
    } else {
      toast.on({
        label: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        state: "danger",
      });
    }
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleSubmitSignUpForm}>
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
          type="text"
          label="닉네임"
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
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
        <Input
          type="password"
          label="비밀번호 확인"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </div>
      <div className="flex gap-x-2">
        <Button
          priority={"secondary"}
          type="button"
          onClick={() => navigate("/log-in")}
        >
          로그인 하러가기
        </Button>
        <Button type="submit">회원가입 완료하기</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
