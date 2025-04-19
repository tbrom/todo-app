import { TodoList } from "./components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 font-[family-name:var(--font-geist-sans)]">
      <TodoList />
    </main>
  );
}
