// per-light simulation so lights run independently and desynced
import type { TrafficLight, LightState } from "./trafficLight";

const sequence: LightState[] = ["red", "green", "yellow"];

export const lights: TrafficLight[] = [
  { id: "A1", state: "red" },
  { id: "A2", state: "red" },
  { id: "A3", state: "red" },
  { id: "A4", state: "red" },
];

const durations: Record<LightState, number> = {
  red: 20000,
  green: 20000,
  yellow: 6000,
};

function startLightSimulation(light: TrafficLight) {
  let idx = Math.floor(Math.random() * sequence.length);

  const tick = () => {
    const state = sequence[idx];
    light.state = state;
    const base = durations[state];
    const jitter = Math.floor(Math.random() * 1000) - 500; // ±500ms
    const delay = Math.max(300, base + jitter);
    idx = (idx + 1) % sequence.length;
    setTimeout(tick, delay);
  };

  // start with a random offset into the current state's duration
  const initialDelay = Math.random() * durations[sequence[idx]];
  setTimeout(tick, initialDelay);
}

export function startSimulation() {
  lights.forEach((l) => startLightSimulation(l));
}
