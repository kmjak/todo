"use client"

import { todosAtom } from "@/store/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

export default function useTodo() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [newTodoName, setNewTodoName] = useState<string>("");

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewTodoName("");
    const id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: Todo = {
      id,
      name: newTodoName,
      description: "",
    };
    console.log(newTodo);

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const handleChangeNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  return {
    newTodoName,
    handleAddTodo,
    handleChangeNewTodoName,
  }
}