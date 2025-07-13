import TodoItem from "@/components/todo/TodoItem";
import { todoItems } from "@/config/todo/todos";
import { Todo } from "@/types/todo/Todo";

export default function TodoList() {
  return (
    <ul className="flex flex-col gap-2 py-4">
      {todoItems.map((todo:Todo) => (
        <TodoItem key={todo.id} name={todo.name} id={todo.id} />
      ))}
    </ul>
  );
}