import { AxiosInstance } from "axios";
import { TodoType } from "../types/todo.type";

class TodoAPI {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getTodos(): Promise<TodoType[]> {
    try {
      const path = "/todos";
      const response = await this.client.get<TodoType[]>(path);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default TodoAPI;
