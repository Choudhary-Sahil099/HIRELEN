import LeaderboardRow from "./leaderRow";

type User = {
  rank: number;
  name: string;
  country: string;
  rating: number;
  trend: number;
  avatar: string;
  isCurrentUser?: boolean;
};

const users: User[] = [
  {
    rank: 4,
    name: "Sophia Moreno",
    country: "Spain",
    rating: 2680,
    trend: 2,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    rank: 5,
    name: "Yuki Tanaka",
    country: "Japan",
    rating: 2645,
    trend: 0,
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    rank: 6,
    name: "Amara Okafor",
    country: "Nigeria",
    rating: 2590,
    trend: -1,
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    rank: 128,
    name: "Julian Vane (You)",
    country: "USA",
    rating: 2150,
    trend: 14,
    avatar: "https://i.pravatar.cc/40?img=4",
    isCurrentUser: true,
  },
];

const LeaderboardTable = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden mt-6">
      <div className="grid grid-cols-[190px_3fr_2fr_2fr_1.4fr] p-7 text-xs font-semibold uppercase border-b border-gray-200 text-teal-900">
        <p>Rank</p>
        <p>Scholar</p>
        <p>Region</p>
        <p>Trend</p>
        <p className="text-left">Rating</p>
      </div>
      <div className="divide-y">
        {users.map((user) => (
          <LeaderboardRow key={user.rank} user={user} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;