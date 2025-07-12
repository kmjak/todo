import { Todo } from "@/types/todo/Todo";

export default function TodoList() {
  const todos: Todo[] = [
    { id: 1, name: "Todoアプリ作成", description: "Next.jsとTypeScriptで作成" },
    { id: 2, name: "ランニング", description: "毎日5km走る" },
    { id: 3, name: "ブロスタ", },
  ];

  return (
    <ul className="flex flex-col gap-2 py-4">
      {todos.map((todo:Todo) => (
        <div className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 text-xl w-80 border border-black rounded-lg" key={todo.id}>
          <p className="">{todo.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-green-500 hover:opacity-40 transition-opacity">更新</p>
            <p className="text-red-500 hover:opacity-40 transition-opacity">削除</p>
          </div>
        </div>
      ))}
    </ul>
  );
}