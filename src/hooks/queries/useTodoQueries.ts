import { useQuery } from "@tanstack/react-query";
import api from "../../apis/api";
import { QUERY_KEY } from "./queryKey";

export const useTodos = () => {
  return useQuery({
    queryKey: QUERY_KEY.TODO,
    queryFn: () => api.todo.getTodos(),
  });
};
