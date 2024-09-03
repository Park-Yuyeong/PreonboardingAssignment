import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL;

class API {
  private authAxios: AxiosInstance;

  auth;

  constructor() {
    this.authAxios = axios.create({ baseURL: AUTH_BASE_URL });

    this.auth = new AuthAPI(this.authAxios);
  }
}

const api = new API();

export default api;
