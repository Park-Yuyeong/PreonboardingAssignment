import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/queries/useTodoQueries";
import { TodoType } from "../../types/todo.type";

const TodoList = () => {
  const navigate = useNavigate();

  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading)
    return (
      <span className="todo-loader mt-8">할 일 목록을 불러오는 중입니다</span>
    );

  if (isError) navigate("/404");

  return (
    <div className="flex flex-col gap-y-4 mt-8">
      <h2 className="font-bold text-2xl pl-2">할 일 목록</h2>
      <ul className="flex flex-col gap-y-1">
        {todos?.map((todo: TodoType) => (
          <li key={todo.id} className="flex gap-x-2 items-center">
            {todo.completed ? (
              <MdCheckBox color="white" />
            ) : (
              <MdCheckBoxOutlineBlank color="white" />
            )}
            <p className="text-sm font-normal">{todo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
