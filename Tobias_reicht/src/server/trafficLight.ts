// trafficLight.ts
export type LightState = "red" | "yellow" | "green";

export interface TrafficLight {
  id: string;
  state: LightState;
}
