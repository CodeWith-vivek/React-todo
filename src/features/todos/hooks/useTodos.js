import { useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const isDuplicate = (text) =>
    todos.some((todo) => todo.text.toLowerCase() === text.toLowerCase());

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      createdAt: new Date(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const reorderTodo = (index, move) => {
    const newTodos = [...todos];
    if (move === "up" && index > 0) {
      [newTodos[index], newTodos[index - 1]] = [
        newTodos[index - 1],
        newTodos[index],
      ];
    }
    if (move === "down" && index < newTodos.length - 1) {
      [newTodos[index], newTodos[index + 1]] = [
        newTodos[index + 1],
        newTodos[index],
      ];
    }
    setTodos(newTodos);
  };

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const stats = { total, completed, active: total - completed };

  return {
    todos,
    stats,
    isDuplicate,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    reorderTodo,
  };
};
