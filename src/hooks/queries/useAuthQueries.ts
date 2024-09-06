import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import useToast from "../../store/useToast";
import {
  ErrorResponse,
  LogInRequest,
  ProfileRequest,
  ProfileResponse,
  RegisterRequest,
} from "../../types/auth.type";
import { QUERY_KEY } from "./queryKey";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { setToast } = useToast();

  return useMutation({
    mutationFn: (data: RegisterRequest) => api.auth.signUp(data),
    onSuccess: () => {
      setToast({ label: "회원가입을 완료했습니다. 로그인을 진행해주세요!" });
      navigate("/log-in");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setToast({
        label: error.response?.data.message || "회원가입에 실패했습니다.",
        state: "danger",
      });
    },
  });
};

export const useLogIn = () => {
  const navigate = useNavigate();
  const { setToast } = useToast();

  return useMutation({
    mutationFn: (data: LogInRequest) => api.auth.logIn(data),
    onSuccess: () => {
      setToast({ label: "로그인에 성공했습니다!" });
      navigate("/my-page");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setToast({
        label:
          error.response?.data.message ||
          "로그인에 실패했습니다. 올바른 아이디와 비밀번호를 입력해주세요.",
        state: "danger",
      });
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: QUERY_KEY.USER,
    queryFn: () => api.auth.getUser(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToast();

  return useMutation({
    mutationFn: (data: ProfileRequest) => api.auth.updateProfile(data),
    onSuccess: (response: ProfileResponse) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER });
      setToast({ label: "내 정보를 수정했습니다!" });

      return response.success;
    },
    onError: (error: AxiosError<ErrorResponse> | Error) => {
      if (isAxiosError(error)) {
        setToast({
          label: error.response?.data.message || "내 정보 수정에 실패했습니다.",
          state: "danger",
        });
      } else {
        setToast({ label: error.message, state: "danger" });
      }

      return false;
    },
  });
};
