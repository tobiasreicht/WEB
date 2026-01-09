import React from "react";

interface Point {
  label: string;
  value: number;
}

interface Props {
  data?: Point[] | null;
}

const TrafficChart: React.FC<Props> = ({ data }) => {
  const vw = 920;
  const vh = 340;
  const padding = { top: 24, right: 28, bottom: 36, left: 44 };

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-center h-56">
        <div className="text-center text-gray-500">Click a traffic light to show last 24h traffic</div>
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

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : acc + ` L ${p.x} ${p.y}`), "");

  // Y axis ticks (3 ticks)
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const t = i / ticks;
    const val = Math.round(max - t * (max - min));
    const y = padding.top + t * (vh - padding.top - padding.bottom);
    return { y, val };
  });

  return (
    <div className="mt-2 bg-white p-4 rounded-lg shadow-sm">
      <svg viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="xMidYMid meet" className="w-full h-80">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* bg */}
        <rect x={0} y={0} width={vw} height={vh} rx={8} fill="#ffffff" />

        {/* y grid & labels */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padding.left} x2={vw - padding.right} y1={t.y} y2={t.y} stroke="#f1f5f9" />
            <text x={padding.left - 8} y={t.y + 4} fontSize={18} fill="#64748b" textAnchor="end" fontWeight="500">
              {t.val}
            </text>
          </g>
        ))}

        {/* area under curve */}
        <path d={`${pathD} L ${vw - padding.right} ${vh - padding.bottom} L ${padding.left} ${vh - padding.bottom} Z`} fill="url(#g1)" />

        {/* line */}
        <path d={pathD} fill="none" stroke="#0ea5e9" strokeWidth={2.8} strokeLinejoin="round" strokeLinecap="round" />

        {/* points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3.6} fill="#0ea5e9" stroke="#fff" strokeWidth={1} />
          </g>
        ))}

        {/* x labels (sparser) */}
        {points.map((p, i) => {
          const show = i % 3 === 0 || i === points.length - 1;
          return (
            show && (
              <text key={i} x={p.x} y={vh - 8} fontSize={18} fill="#64748b" textAnchor="middle" fontWeight="500">
                {p.label}
              </text>
            )
          );
        })}
      </svg>
    </div>
  );
};

export default TrafficChart;
