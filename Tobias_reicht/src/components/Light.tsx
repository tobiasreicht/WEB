import React, { useState } from 'react';

export default function Light() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`max-w-sm w-full h-40 rounded-xl flex flex-col items-center justify-center gap-4 transition-colors duration-300 shadow-lg ${
        isOn ? 'bg-yellow-400' : 'bg-gray-400'
      }`}
    >
      <div className="text-4xl">💡</div>
      <button
        onClick={() => setIsOn(!isOn)}
        className="px-4 py-2 rounded-xl bg-white shadow-md hover:bg-gray-100 transition font-semibold"
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
}