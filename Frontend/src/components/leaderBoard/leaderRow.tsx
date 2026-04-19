type User = {
  rank: number;
  name: string;
  country: string;
  rating: number;
  trend: number;
  avatar: string;
  isCurrentUser?: boolean;
};

const LeaderboardRow = ({ user }: { user: User }) => {
  return (
    <div
      className={`grid grid-cols-[190px_3fr_2fr_2fr_1.4fr] p-7 inter font-semibold items-center text-sm border-b border-gray-200 transition ${
        user.isCurrentUser ? "bg-gray-200 rounded-lg" : "hover:bg-gray-100"
      }`}
    >
      <p className="text-gray-600 text-start">
        {user.rank.toString().padStart(2, "0")}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-sm object-cover"
        />
        <span className="font-medium text-gray-800">
          {user.name}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <span>🌍</span>
        <span>{user.country}</span>
      </div>
      <p
        className={`font-medium ${
          user.trend > 0
            ? "text-green-600"
            : user.trend < 0
            ? "text-red-500"
            : "text-gray-400"
        }`}
      >
        {user.trend > 0
          ? `▲ +${user.trend}`
          : user.trend < 0
          ? `▼ ${user.trend}`
          : "—"}
      </p>
      <p className="font-semibold text-teal-700">
        {user.rating.toLocaleString()}
      </p>
    </div>
  );
};

export default LeaderboardRow;