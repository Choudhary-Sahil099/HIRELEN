import { motion } from "framer-motion";

const CircularProgress = () => {
 const total = 3892;
  const easy = 154;
  const medium = 186;
  const hard = 21;
  const solved = easy + medium + hard;

  const radius = 75;
  const circumference = 2 * Math.PI * radius;

  const easyLength = (easy / total) * circumference;
  const mediumLength = (medium / total) * circumference;
  const hardLength = (hard / total) * circumference;
  const easyStartAngle = -90;
  const mediumStartAngle = easyStartAngle + (easy / total) * 360;
  const hardStartAngle = mediumStartAngle + (medium / total) * 360;

  const stats = [
    { label: "Easy", solved: easy, total: 935, color: "text-emerald-500", bg: "bg-emerald-500" },
    { label: "Medium", solved: medium, total: 2036, color: "text-yellow-500", bg: "bg-yellow-500" },
    { label: "Hard", solved: hard, total: 921, color: "text-red-500", bg: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl max-w-3xl font-sans">
      <div className="relative flex items-center justify-center">
        <svg width="160" height="160">
          <circle 
            cx="80" cy="80" r={radius} 
            stroke="#f3f4f6" strokeWidth="8" fill="transparent" 
          />
          <motion.circle
            cx="80" cy="80" r={radius} 
            stroke="#10b981" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - easyLength }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ transformOrigin: "80px 80px", transform: `rotate(${easyStartAngle}deg)` }}
          />
          <motion.circle
            cx="80" cy="80" r={radius} 
            stroke="#eab308" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - mediumLength }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
            style={{ transformOrigin: "80px 80px", transform: `rotate(${mediumStartAngle}deg)` }}
          />
          <motion.circle
            cx="80" cy="80" r={radius} 
            stroke="#ef4444" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - hardLength }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            strokeLinecap="round"
            style={{ transformOrigin: "80px 80px", transform: `rotate(${hardStartAngle}deg)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
          <span className="text-3xl font-semibold text-gray-800">{solved}</span>
          <span className="text-xs text-gray-500 font-medium mt-1">Solved</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3 ml-2 md:ml-6 min-w-40">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className={`${item.color} font-medium`}>{item.label}</span>
              <span className="text-gray-700 font-medium">
                {item.solved} <span className="text-gray-400 font-normal">/{item.total}</span>
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.solved / item.total) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${item.bg}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block h-40 w-px bg-gray-400 mx-6"></div>
      <div className="flex flex-col items-start min-w-45">
        <div className="flex justify-between w-full mb-3">
          <span className="text-sm text-gray-600 font-semibold">Badges</span>
          <span className="text-sm text-gray-400 font-semibold">6</span>
        </div>
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-18 h-18 bg-linear-to-br from-yellow-50 to-yellow-200 rounded-xl flex items-center justify-center shadow-sm cursor-pointer border border-yellow-300/50"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15l-3.5 2 1-4-3-2.5 4-.5L12 6l1.5 4.5 4 .5-3 2.5 1 4z"/>
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-1">Most Recent Badge</span>
            <span className="text-sm font-semibold text-gray-700 leading-tight">100 Days Code</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CircularProgress;