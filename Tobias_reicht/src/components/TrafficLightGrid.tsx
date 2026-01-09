import React, { useEffect, useState } from "react";

import TrafficLight from "./TrafficLight";
import type { TrafficLightState } from "./TrafficLight";

interface ApiLight {
  id: string;
  state: TrafficLightState;
}

const initialLights: ApiLight[] = [
  { id: "Dornbirn Messepark", state: "red" },
  { id: "Dornbirn Brücke", state: "red" },
  { id: "Dornbirn Hauptstraße", state: "red" },
  { id: "Dornbirn Kreuzung", state: "red" },
];

import TrafficChart from "./TrafficChart";

const TrafficLightGrid: React.FC = () => {
  const [lights, setLights] = useState<ApiLight[]>(initialLights);
  const [selected, setSelected] = useState<ApiLight | null>(null);
  const [stats, setStats] = useState<{ label: string; value: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const cacheRef = React.useRef<Record<string, Record<"24h" | "7d" | "30d", { label: string; value: number }[]>>>({});

  useEffect(() => {
    let mounted = true;
    let simTimers: number[] = [];
    let localSimRunning = false;

    const durations: Record<TrafficLightState, number> = {
      red: 5000,
      green: 5000,
      yellow: 2000,
    };
    const sequence: TrafficLightState[] = ["red", "green", "yellow"];
    let simIndex = 0;

    const startLocalSimulation = () => {
      if (localSimRunning) return;
      localSimRunning = true;

      // initialize with random states per light
      setLights((prev) =>
        prev.map((l) => ({ ...l, state: sequence[Math.floor(Math.random() * sequence.length)] }))
      );

      // start independent timers per light
      initialLights.forEach((base, idx) => {
        let i = Math.floor(Math.random() * sequence.length);

        const tick = () => {
          const state = sequence[i];
          if (mounted) {
            setLights((prev) => prev.map((pl) => (pl.id === base.id ? { ...pl, state } : pl)));
          }
          const delay = durations[state] + Math.floor(Math.random() * 1000) - 500; // small jitter
          i = (i + 1) % sequence.length;
          const t = window.setTimeout(tick, Math.max(300, delay));
          simTimers.push(t);
        };

        // initial offset so lights are desynced
        const initialDelay = Math.random() * durations[sequence[i]];
        const t0 = window.setTimeout(tick, initialDelay);
        simTimers.push(t0);
      });
    };

    const fetchLights = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/traffic-lights");
        if (!res.ok) throw new Error("fetch-failed");
        const data = await res.json();
        if (mounted && data?.lights) {
          // if a local sim was running, clear it
          if (localSimRunning) {
            simTimers.forEach((t) => window.clearTimeout(t));
            simTimers = [];
            localSimRunning = false;
          }
          setLights(data.lights);
        }
      } catch (e) {
        // If API is not reachable, fall back to client-side simulation
        startLocalSimulation();
      }
    };

    fetchLights();
    const poll = window.setInterval(fetchLights, 1000);

    return () => {
      mounted = false;
      window.clearInterval(poll);
      simTimers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const generate24hStats = (id: string) => {
    const now = new Date();
    const arr: { label: string; value: number }[] = [];
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const label = d.getHours().toString().padStart(2, "0") + ":00";
      // random traffic volume, vary by id so different lights differ
      const base = (id.charCodeAt(0) % 5) * 20; // small deterministic variation
      const value = Math.max(0, Math.round(base + Math.random() * 80 + (Math.sin(i) * 10)));
      arr.push({ label, value });
    }
    return arr;
  };

  const generate7dStats = (id: string) => {
    const now = new Date();
    const arr: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const label = days[d.getDay()];
      const base = (id.charCodeAt(0) % 5) * 20;
      const value = Math.max(0, Math.round(base + Math.random() * 120 + (Math.sin(i) * 20)));
      arr.push({ label, value });
    }
    return arr;
  };

  const generate30dStats = (id: string) => {
    const now = new Date();
    const arr: { label: string; value: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const label = (d.getDate()).toString();
      const base = (id.charCodeAt(0) % 5) * 20;
      const value = Math.max(0, Math.round(base + Math.random() * 140 + (Math.sin(i * 0.2) * 30)));
      arr.push({ label, value });
    }
    return arr;
  };

  const calculateOverallAverage = (): number => {
    const allValues: number[] = [];
    Object.values(cacheRef.current).forEach((ranges) => {
      Object.values(ranges).forEach((data) => {
        data.forEach((d) => allValues.push(d.value));
      });
    });
    if (allValues.length === 0) return 0;
    return Math.round(allValues.reduce((s, v) => s + v, 0) / allValues.length);
  };

  const onLightClick = (id?: string) => {
    if (!id) return;
    setLoading(true);
    const light = lights.find((l) => l.id === id) || { id, state: "red" as any };
    setSelected(light);
    
    // Simulate slight delay to show loading state
    setTimeout(() => {
      // Initialize cache for this light if needed
      if (!cacheRef.current[id]) {
        cacheRef.current[id] = {
          "24h": generate24hStats(id),
          "7d": generate7dStats(id),
          "30d": generate30dStats(id),
        };
      }
      setStats(cacheRef.current[id][timeRange]);
      setLoading(false);
    }, 300);
  };

  const onTimeRangeChange = (range: "24h" | "7d" | "30d") => {
    setTimeRange(range);
    if (selected && cacheRef.current[selected.id]) {
      setStats(cacheRef.current[selected.id][range]);
    }
  };

  const onReset = () => {
    setSelected(null);
    setStats(null);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-sm rounded-xl p-6">
          <div className="flex gap-6">
            {/* Left: 2x2 grid */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Traffic Lights</h2>
              <div className="grid grid-cols-2 gap-6">
                {lights.map((l) => (
                  <div key={l.id} className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    selected?.id === l.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-transparent bg-transparent hover:bg-slate-50"
                  }`}>
                    <TrafficLight id={l.id} state={l.state} onClick={onLightClick} />
                    <div className={`mt-2 text-sm font-medium ${
                      selected?.id === l.id ? "text-blue-700" : "text-slate-500"
                    }`}>{l.id}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: chart panel */}
            <aside className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-slate-700">Traffic — {selected ? `📋 ${selected.id}` : "Analytics"}</h3>
                <div className="flex gap-1">
                  {(["24h", "7d", "30d"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => onTimeRangeChange(range)}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                        timeRange === range
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <TrafficChart 
                  data={stats} 
                  lightId={selected?.id} 
                  lightState={selected?.state} 
                  loading={loading}
                  overallAverage={calculateOverallAverage()}
                  timeRange={timeRange}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-500">Click a light to load its data.</div>
                {selected && (
                  <button
                    onClick={onReset}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors"
                  >
                    ← Back
                  </button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLightGrid;
