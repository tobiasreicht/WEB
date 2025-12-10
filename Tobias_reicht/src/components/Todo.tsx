import { useState, useEffect } from "react";

    interface TodoItem {
        id: number;
        text: string;
        completed: boolean;
    }
export default function Todo() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => { 
        const savedTodos = localStorage.getItem("todos"); 
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const toggleTodo = (id: number) => {
            setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
            );
        }
        
    const addTodo = () => {
        if (newTodo.trim() === "") return;
        setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
        ]);
        setNewTodo("");
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

  return (
    <div className="max-w-sm w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-lg flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-slate-900">Todo Component</h3>

      <div className="flex w-full gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={'flex justify-between items-center p-2 border rounded hover:bg-slate-100' }
          >
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
        ))}
      </ul>
    </div>
  );
}