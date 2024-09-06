import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";
import TodoAPI from "./todo.api";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL;
const JSONPLACEHOLDER_BASE_URL = import.meta.env.VITE_JSONPLACEHOLDER_API_URL;

class API {
  private authAxios: AxiosInstance;
  private todoAxios: AxiosInstance;

  auth;
  todo;

  constructor() {
    this.authAxios = axios.create({ baseURL: AUTH_BASE_URL });
    this.todoAxios = axios.create({ baseURL: JSONPLACEHOLDER_BASE_URL });

    this.auth = new AuthAPI(this.authAxios);
    this.todo = new TodoAPI(this.todoAxios);
  }
}

const api = new API();

export default api;
