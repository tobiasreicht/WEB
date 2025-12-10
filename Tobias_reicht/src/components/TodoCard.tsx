import React from "react";

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoCardProps {
  todo: TodoItem;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoCard({ todo, toggleTodo, deleteTodo }: TodoCardProps) {
  return (
    <li className="flex justify-between items-center p-2 border rounded hover:bg-slate-100">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-slate-400" : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
}
