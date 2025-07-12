import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center py-4">
      <TodoForm />
      <TodoList />
    </main>
  );
}
