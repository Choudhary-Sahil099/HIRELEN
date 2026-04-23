import { Flame } from "lucide-react";
import { motion } from "framer-motion";
const StreakCard = ({ streak}: any) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-100 flex justify-center items-center px-5 py-3 gap-2 rounded-lg"
      >
        <div className="p-1 bg-[#d9e1dc] rounded-lg">
          <Flame fill="#085159" stroke="#085159" size={40} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[12px]">ACTIVE STREAK</h3>
          <span className="font-semibold text-xl inter">{streak} DAYS</span>
        </div>
      </motion.div>
    </div>
  );
};

export default StreakCard;
