"use client"

import TodoItem from "@/components/todo/TodoItem";
import { todosAtom } from "@/store/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { useAtomValue } from "jotai";

export default function TodoList() {
  const todos = useAtomValue(todosAtom);

  return (
    <ul className="flex flex-col gap-2 py-4">
      {todos.map((todo:Todo) => (
        <TodoItem key={todo.id} name={todo.name} id={todo.id} />
      ))}
    </ul>
  );
}