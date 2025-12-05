type Props = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: Props) {
  return (
    <button
     
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
    

       onClick={onPress}
        >
      {title}
    </button>
  );
}
