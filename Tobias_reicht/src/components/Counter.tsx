import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-sm w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-lg flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-slate-900">Counter</h3>
      <div className="text-2xl font-bold text-slate-700">{count}</div>
      <div className="flex gap-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition"
        >
          +
        </button>
        <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition"
            >
            -
        </button>
      </div>
    </div>
  );
}