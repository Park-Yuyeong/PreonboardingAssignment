import { AxiosInstance } from "axios";
import {
  LogInRequest,
  LogInResponse,
  ProfileRequest,
  ProfileResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../types/auth.type";

class AuthAPI {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async signUp(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const path = "/register";
      const response = await this.client.post<RegisterResponse>(path, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logIn(data: LogInRequest): Promise<LogInResponse> {
    try {
      const path = "/login";
      const response = await this.client.post<LogInResponse>(path, data);

      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUser(): Promise<User> {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const path = "/user";
      const response = await this.client.get<User>(path, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: ProfileRequest): Promise<ProfileResponse> {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const path = "/profile";
        const response = await this.client.patch<ProfileResponse>(path, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw Error("로그인 후 이용하실 수 있는 서비스입니다.");
    }
  }
}

export default AuthAPI;
