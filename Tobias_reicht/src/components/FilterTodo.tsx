import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import type { TodoItem } from "./TodoCard";

interface FilterTodoProps {
  initialTodos: TodoItem[];
}

export default function FilterTodo({ initialTodos }: FilterTodoProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    // Testdaten übernehmen
    setTodos(initialTodos);
  }, [initialTodos]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="max-w-sm w-full bg-white/80 p-4 rounded-2xl shadow flex flex-col gap-4">
      <h3 className="text-lg font-bold text-slate-800">Todo Liste</h3>

      {/* Suchfeld */}
      <input
        type="text"
        placeholder="Suchen..."
        className="border rounded px-3 py-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="flex flex-col gap-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <p className="text-slate-500 text-sm text-center">
            Keine Todos gefunden.
          </p>
        )}
      </ul>
    </div>
  );
}
