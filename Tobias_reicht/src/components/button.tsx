type Props = {
  title: string;
  onClick?: () => void;
};

export default function Button({ title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 
        rounded-xl 
        bg-amber-500 
        text-white 
        font-semibold 
        shadow-[0_6px_0_#b45309]
        active:shadow-[0_2px_0_#b45309]
        active:translate-y-1
        transition-all
        select-none
        m-10
      "
    >
      {title}
    </button>
  );
}
