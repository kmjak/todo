"use client"

import useTodo from "@/hooks/todo/useTodo";

export default function TodoForm() {
  const { handleAddTodo, handleChangeNewTodoName, newTodoName } = useTodo();
  return (
    <form className="flex items-center gap-1 justify-center" onSubmit={handleAddTodo}>
      <input
        type="text"
        className="w-60 h-12 outline-none border-2 rounded-md text-xl px-2 py-1 focus:border-blue-400 transition-colors"
        placeholder="Add a new task"
        value={newTodoName}
        onChange={handleChangeNewTodoName}
      />
      <button
        type="submit"
        className="w-20 h-12 border-2 rounded-md text-xl cursor-pointer hover:border-blue-400 active:border-blue-400 active:opacity-50 transition-colors duration-200"
      >
        Add
      </button>
    </form>
  );
}