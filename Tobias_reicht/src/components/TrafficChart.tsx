import React, { useState } from "react";

interface Point {
  label: string;
  value: number;
}

interface Props {
  data?: Point[] | null;
  lightId?: string;
  lightState?: "red" | "yellow" | "green";
  loading?: boolean;
  overallAverage?: number;
  timeRange?: "24h" | "7d" | "30d";
}

const TrafficChart: React.FC<Props> = ({ data, lightId, lightState, loading, overallAverage = 0, timeRange = "24h" }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const vw = 920;
  const vh = 340;
  const padding = { top: 24, right: 28, bottom: 36, left: 44 };

  // Loading state
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-80 bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-blue-200 border-r-blue-200 animate-spin"></div>
          </div>
          <p className="text-gray-500 text-sm">Loading traffic data...</p>
        </div>
      </div>
    );
  }

  // Welcome/empty state with demo stats
  if (!data || data.length === 0) {
    return (
      <div>
        {/* Demo Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200 opacity-60">
            <div className="text-xs text-blue-600 font-semibold">Network Avg</div>
            <div className="text-2xl font-bold text-blue-700">{overallAverage || "—"}</div>
            <div className="text-xs text-blue-500">cars/h</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 rounded-lg border border-emerald-200 opacity-60">
            <div className="text-xs text-emerald-600 font-semibold">Min</div>
            <div className="text-2xl font-bold text-emerald-700">18</div>
            <div className="text-xs text-emerald-500">cars</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg border border-red-200 opacity-60">
            <div className="text-xs text-red-600 font-semibold">Peak</div>
            <div className="text-2xl font-bold text-red-700">94</div>
            <div className="text-xs text-red-500">14:00</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 opacity-60">
            <div className="text-xs text-amber-600 font-semibold">Status</div>
            <div className="text-2xl font-bold text-amber-700">—</div>
            <div className="text-xs text-amber-500">No Light</div>
          </div>
        </div>

        <div className="w-full h-80 bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-lg p-6 flex items-center justify-center">
          <div className="text-center max-w-xs">
            <div className="text-4xl mb-3">🚦</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Data Selected</h3>
            <p className="text-gray-500 text-sm mb-4">
              Click on any traffic light in the list to view its hourly traffic data from the last 24 hours.
            </p>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">💡 Tip:</span> Hover over data points to see exact values and peak hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 10);
  const min = Math.min(...data.map((d) => d.value), 0);

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * (vw - padding.left - padding.right);
    const y = padding.top + (1 - (d.value - min) / (max - min || 1)) * (vh - padding.top - padding.bottom);
    return { x, y, label: d.label, v: d.value };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Calculate trend
  const firstHalf = data.slice(0, Math.floor(data.length / 2)).reduce((s, d) => s + d.value, 0) / Math.ceil(data.length / 2);
  const secondHalf = data.slice(Math.floor(data.length / 2)).reduce((s, d) => s + d.value, 0) / Math.floor(data.length / 2);
  const trendUp = secondHalf > firstHalf;

  // Calculate congestion intensity (0-1)
  const avgValue = data.reduce((s, d) => s + d.value, 0) / data.length;
  const intensity = Math.min(avgValue / (max * 0.7), 1);
  const intensityColor = intensity > 0.7 ? "from-red-50 to-red-100" : intensity > 0.4 ? "from-amber-50 to-amber-100" : "from-green-50 to-green-100";

  // Stats
  const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);
  const minVal = Math.min(...data.map((d) => d.value));
  const maxVal = Math.max(...data.map((d) => d.value));
  const peakIdx = data.findIndex((d) => d.value === maxVal);
  const peakHour = data[peakIdx]?.label || "—";

  // Y axis ticks
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const t = i / ticks;
    const val = Math.round(max - t * (max - min));
    const y = padding.top + t * (vh - padding.top - padding.bottom);
    return { y, val };
  });

  const stateColor: Record<string, string> = {
    red: "#ef4444",
    yellow: "#f59e0b",
    green: "#22c55e",
  };

  return (
    <div>
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-600 font-semibold">Average</div>
          <div className="flex items-baseline gap-1">
            <div className="text-2xl font-bold text-blue-700">{avg}</div>
            <span className="text-lg text-blue-600">{trendUp ? "↑" : "↓"}</span>
          </div>
          <div className="text-xs text-blue-500">cars/h • {trendUp ? "↑ Increasing" : "↓ Decreasing"}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 rounded-lg border border-emerald-200">
          <div className="text-xs text-emerald-600 font-semibold">Min</div>
          <div className="text-2xl font-bold text-emerald-700">{minVal}</div>
          <div className="text-xs text-emerald-500">cars</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg border border-red-200">
          <div className="text-xs text-red-600 font-semibold">Peak</div>
          <div className="text-2xl font-bold text-red-700">{maxVal}</div>
          <div className="text-xs text-red-500">{peakHour}</div>
        </div>
        <div className={`bg-gradient-to-br ${intensityColor} p-3 rounded-lg border ${intensity > 0.7 ? "border-red-200" : intensity > 0.4 ? "border-amber-200" : "border-green-200"}`}>
          <div className={`text-xs font-semibold ${intensity > 0.7 ? "text-red-600" : intensity > 0.4 ? "text-amber-600" : "text-green-600"}`}>
            Intensity
          </div>
          <div className={`text-2xl font-bold ${intensity > 0.7 ? "text-red-700" : intensity > 0.4 ? "text-amber-700" : "text-green-700"}`}>
            {intensity > 0.7 ? "High" : intensity > 0.4 ? "Medium" : "Low"}
          </div>
          <div className={`text-xs ${intensity > 0.7 ? "text-red-500" : intensity > 0.4 ? "text-amber-500" : "text-green-500"}`}>
            {lightState ? lightState.toUpperCase() : "—"}
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white p-4 rounded-lg shadow-sm relative">
        <svg
          viewBox={`0 0 ${vw} ${vh}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-80"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* bg */}
          <rect x={0} y={0} width={vw} height={vh} rx={8} fill="#ffffff" />

          {/* peak hour highlight zone */}
          {peakIdx >= 0 && (
            <rect
              x={points[peakIdx]?.x - 20}
              y={padding.top}
              width={40}
              height={vh - padding.top - padding.bottom}
              fill="rgba(239, 68, 68, 0.06)"
              rx={4}
            />
          )}

          {/* y grid & labels */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={padding.left} x2={vw - padding.right} y1={t.y} y2={t.y} stroke="#f1f5f9" />
              <text
                x={padding.left - 8}
                y={t.y + 4}
                fontSize={18}
                fill="#64748b"
                textAnchor="end"
                fontWeight="500"
              >
                {t.val}
              </text>
            </g>
          ))}

          {/* area under curve */}
          <path
            d={`${pathD} L ${vw - padding.right} ${vh - padding.bottom} L ${padding.left} ${vh - padding.bottom} Z`}
            fill="url(#g1)"
            style={{ animation: "fadeIn 0.6s ease-in" }}
          />

          {/* line */}
          <path
            d={pathD}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={2.8}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ animation: "drawLine 1s ease-in-out" }}
          />

          {/* points */}
          {points.map((p, i) => (
            <g key={i} onMouseEnter={() => setHoveredIdx(i)} style={{ cursor: "pointer" }}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === i ? 5.5 : 3.6}
                fill={hoveredIdx === i ? "#0284c7" : "#0ea5e9"}
                stroke="#fff"
                strokeWidth={hoveredIdx === i ? 2 : 1}
                style={{
                  transition: "all 0.2s ease",
                  filter: hoveredIdx === i ? "drop-shadow(0 0 6px rgba(14,165,233,0.4))" : "none",
                }}
              />

              {/* Tooltip on hover */}
              {hoveredIdx === i && (
                <g>
                  <rect
                    x={p.x - 38}
                    y={p.y - 48}
                    width={76}
                    height={36}
                    fill="#1f2937"
                    rx={6}
                    opacity="0.95"
                  />
                  <text
                    x={p.x}
                    y={p.y - 28}
                    fontSize={13}
                    fill="#fff"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {p.v} cars
                  </text>
                  <text x={p.x} y={p.y - 12} fontSize={11} fill="#9ca3af" textAnchor="middle">
                    {p.label}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* x labels (sparser) */}
          {points.map((p, i) => {
            const show = i % 3 === 0 || i === points.length - 1;
            return (
              show && (
                <text
                  key={i}
                  x={p.x}
                  y={vh - 8}
                  fontSize={18}
                  fill="#64748b"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {p.label}
                </text>
              )
            );
          })}
        </svg>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes drawLine {
            from { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
            to { stroke-dashoffset: 0; stroke-dasharray: 1000; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TrafficChart;
