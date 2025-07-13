import { todoItems } from "@/config/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { atom } from "jotai";

export const todosAtom = atom<Todo[]>(todoItems);