const recentProblems = [
  { title: "Two Sum", difficulty: "Easy", status: "Solved" },
  { title: "LRU Cache", difficulty: "Hard", status: "Attempted" },
  { title: "Binary Tree Zigzag", difficulty: "Medium", status: "Solved" },
];

const getDifficultyColor = (level: string) => {
  if (level === "Easy") return "text-green-500";
  if (level === "Medium") return "text-yellow-500";
  return "text-red-500";
};

const RecentProblems = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Problems</h3>

      <div className="space-y-4">
        {recentProblems.map((p, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="font-medium">{p.title}</span>

            <div className="flex gap-3 text-sm">
              <span className={getDifficultyColor(p.difficulty)}>
                {p.difficulty}
              </span>
              <span className="text-gray-400">{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProblems;