"use client";

// This component is a simple Todo List that fetches data from localStorage.
// It uses React's useState and useEffect hooks to manage state and side effects.
// The component fetches the todos from localStorage when it mounts and sets the state.
// It also includes a loading state to indicate when the data is being fetched.
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { TodoForm } from "./TodoForm";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch todos from localStorage when the component mounts
  // and set the loading state to false.
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage whenever the todos state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  return (
    <div className="w-full max-w-7xl md:max-w-xl">
      <h2 className="text-xl font-bold">Todo List</h2>
      <TodoForm onAddTodo={handleAddTodo} />
      {renderLoading()}
      {renderNoTodosAvailable()}
      {renderTodos()}
    </div>
  );

  function renderLoading() {
    return isLoading ? <p>Loading...</p> : null;
  }

  function renderNoTodosAvailable() {
    return !isLoading && !todos.length ? (
      <p>No Todos available. Try adding a new Todo!</p>
    ) : null;
  }

  function renderTodos() {
    return todos.map((todo: Todo) => <Item {...getItemProps(todo)} />);
  }

  function getItemProps(todo: Todo) {
    return {
      todo,
      handleToggleTodo,
      handleDeleteTodo,
    };
  }

  function handleAddTodo(text: string, category: string) {
    if (text.trim() && category.trim()) {
      const newTodos = [
        ...todos,
        {
          id: Date.now(),
          text: text.trim(),
          completed: false,
          category: category.trim(),
        },
      ];
      setTodos(newTodos);
    }
  }

  // delete todo in state
  function handleDeleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // toggle todo in state
  function handleToggleTodo(id: number) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
  }
};
