import { Share2, UserRoundPen, Dot } from "lucide-react";

type Props = {
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  title: string;
  followers?: number;
  following?: number;
  onEdit: () => void;
};

const AvatarCard = ({
  name,
  bio,
  avatar,
  rating,
  title,
  followers = 0,
  following = 0,
  onEdit,
}: Props) => {
  return (
    <div className="w-full p-8 flex bg-white rounded-xl gap-5 relative">
      <button
        onClick={onEdit}
        className="absolute top-7 right-7 rounded-lg flex gap-2 items-center hover:bg-teal-200 p-2 hover:cursor-pointer"
      >
        Edit <UserRoundPen size={18} />
      </button>
      <div className="bg-gray-200 p-1 rounded-xl">
        <img
          src={avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-45 h-45 rounded-xl shrink-0 object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-semibold text-teal-900">{name}</h1>

          <p className="bg-teal-900 px-2 py-1 rounded-xl text-white font-semibold">
            {title}
          </p>

          <Share2 className="border border-gray-400 p-1 rounded-lg" size={30} />
        </div>

        <div className="text-lg max-w-md font-semibold">
          <p className="leading-relaxed">
            {bio || "No bio added yet."}
          </p>
        </div>

        <div className="flex gap-7">
          <h1 className="flex gap-1 items-center">
            <Dot />
            <span className="font-semibold">{followers}</span> Followers
          </h1>

          <h1 className="flex gap-1 items-center">
            <Dot />
            <span className="font-semibold">{following}</span> Following
          </h1>
        </div>
      </div>
      <div className="absolute bottom-9 right-9 flex flex-col">
        <p className="text-[12px] text-center">ELO RATING</p>
        <h2 className="text-3xl font-semibold inter text-teal-900">
          {rating}
        </h2>
      </div>
    </div>
  );
};

export default AvatarCard;