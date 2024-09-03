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

  async signUp(data: RegisterRequest): Promise<RegisterResponse | null> {
    try {
      const path = "/register";
      const response = await this.client.post<RegisterResponse>(path, data);

      return response.data;
    } catch (error) {
      console.error("Sign Up Error: ", error);

      return null;
    }
  }

  async logIn(data: LogInRequest): Promise<LogInResponse | null> {
    try {
      const path = "/login?expiresIn=10m";
      const response = await this.client.post<LogInResponse>(path, data);

      return response.data;
    } catch (error) {
      console.error("Log In Error: ", error);

      return null;
    }
  }

  async getUser(): Promise<User | null> {
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
      console.error("User Information Error: ", error);

      return null;
    }
  }

  async updateProfile(data: ProfileRequest): Promise<ProfileResponse | null> {
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
        console.error("Profile Update Error: ", error);

        return null;
      }
    } else {
      console.error("Access token is missing.");

      return null;
    }
  }
}

export default AuthAPI;
