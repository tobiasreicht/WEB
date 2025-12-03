
import janAvatar from '../assets/jan.jpg';

interface UserCardProps {
  name: string;
  title?: string;
  bio?: string;
}

export default function Card({
  name,
  title = "Member",
  bio = "",
 
}: UserCardProps) {
  return (
    <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={janAvatar} alt="Jan" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{title}</p>
        </div>
      </div>

      {bio && <p className="mt-2 text-sm text-slate-600">{bio}</p>}


 

    </div>
  );
}
