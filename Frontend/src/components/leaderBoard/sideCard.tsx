const TopUserCard = ({
  name,
  rating,
  avatar,
}: {
  name: string;
  rating: string;
  avatar: string;
}) => (
  <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center gap-3">
    <img src={avatar} className="w-20 h-20 rounded-md" />
    <p className="text-md font-semibold inter">{name}</p>
    <p className="text-xs text-teal-700 font-semibold inter">{rating} ELO</p>
  </div>
);

export default TopUserCard;