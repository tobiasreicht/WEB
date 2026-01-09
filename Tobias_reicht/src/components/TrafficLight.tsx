import React from "react";

export type TrafficLightState = "red" | "yellow" | "green";

interface Props {
  id?: string;
  state: TrafficLightState;
  size?: number;
  onClick?: (id?: string) => void;
}

const colorClasses: Record<TrafficLightState, string> = {
  red: "bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.35)]",
  yellow: "bg-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.28)]",
  green: "bg-emerald-500 shadow-[0_0_18px_rgba(34,197,94,0.28)]",
};

const TrafficLight: React.FC<Props> = ({ id, state, size = 56, onClick }) => {
  const dotStyle = { width: size, height: size } as React.CSSProperties;

  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={() => onClick && onClick(id)}
      className={
        "bg-neutral-900 p-3 rounded-2xl flex flex-col items-center transition-transform hover:scale-[1.02] shadow-md " +
        (onClick ? "cursor-pointer" : "")
      }
    >
      <div
        className={`rounded-full m-1 ${state === "red" ? colorClasses.red : "bg-gray-800"}`}
        style={dotStyle}
        aria-hidden
      />
      <div
        className={`rounded-full m-1 ${state === "yellow" ? colorClasses.yellow : "bg-gray-800"}`}
        style={dotStyle}
        aria-hidden
      />
      <div
        className={`rounded-full m-1 ${state === "green" ? colorClasses.green : "bg-gray-800"}`}
        style={dotStyle}
        aria-hidden
      />
    </div>
  );
};

export default TrafficLight;
