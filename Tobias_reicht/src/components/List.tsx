
interface ListProps {
  title: string;
  items: string[];
}

export default function List({ title, items }: ListProps) {
  return (
    <div className="max-w-sm w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 rounded-xl bg-white/60 border border-slate-100 shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}