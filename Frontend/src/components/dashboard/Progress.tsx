import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const CircularProgress = () => {
  const total = 3892;
  const easy = 154;
  const medium = 186;
  const hard = 21;
  const solved = easy + medium + hard;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const easyLength = (easy / total) * circumference;
  const mediumLength = (medium / total) * circumference;
  const hardLength = (hard / total) * circumference;

  const easyStartAngle = -90;
  const mediumStartAngle = easyStartAngle + (easy / total) * 360;
  const hardStartAngle = mediumStartAngle + (medium / total) * 360;

  const stats = [
    {
      label: "Easy",
      solved: easy,
      total: 935,
      color: "text-emerald-500",
      bg: "bg-emerald-500",
    },
    {
      label: "Medium",
      solved: medium,
      total: 2036,
      color: "text-yellow-500",
      bg: "bg-yellow-500",
    },
    {
      label: "Hard",
      solved: hard,
      total: 921,
      color: "text-red-500",
      bg: "bg-red-500",
    },
  ];
  const rankData = [
    { date: "2024-02-15", rank: 1464},
    { date: "2024-01-10", rank: 1451},
    { date: "2024-03-01", rank: 1447},
    { date: "2024-01-01", rank: 1561},
    { date: "2024-03-20", rank: 1469},
    { date: "2024-02-01", rank: 1474},
    { date: "2024-04-01", rank: 1517},
    { date: "2024-04-01", rank: 1496},
  ];

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl font-sans ">
      <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="8"
            fill="transparent"
          />

          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#10b981"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - easyLength,
            }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
            style={{
              transformOrigin: "80px 80px",
              transform: `rotate(${easyStartAngle}deg)`,
            }}
          />

          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#eab308"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - mediumLength,
            }}
            transition={{ duration: 1, delay: 0.2 }}
            strokeLinecap="round"
            style={{
              transformOrigin: "80px 80px",
              transform: `rotate(${mediumStartAngle}deg)`,
            }}
          />

          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#ef4444"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - hardLength,
            }}
            transition={{ duration: 1, delay: 0.4 }}
            strokeLinecap="round"
            style={{
              transformOrigin: "80px 80px",
              transform: `rotate(${hardStartAngle}deg)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-800">
            {solved}/<span className="text-sm">{total}</span>
          </span>
          <span className="text-xs text-gray-500 font-medium mt-1">Solved</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3 ml-2 md:ml-6 min-w-45">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[13px] mb-2">
              <span className={`${item.color} font-medium`}>{item.label}</span>
              <span className="text-gray-700 font-medium">
                {item.solved}{" "}
                <span className="text-gray-400">/{item.total}</span>
              </span>
            </div>

            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(item.solved / item.total) * 100}%`,
                }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full ${item.bg}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* divider */}
      <div className="hidden md:block h-40 w-px bg-gray-400 ml-7 mr-5"></div>
      <div className="flex flex-col min-w-60">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 font-semibold">
            Rank Progress
          </span>
        </div>

        <div className="w-full h-40 ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rankData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{ outline: 'none' }} >
              <XAxis dataKey="date" hide />
              <YAxis
                reversed
                hide
                domain={[(dataMin) => dataMin - 30, (dataMax) => dataMax + 30]}
              />
              <Tooltip contentStyle={{ display: "none" }} />
              <Line
                type="linear"
                dataKey="rank"
                stroke="#0000FF"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#fff",
                  stroke: "#f59e0b",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
