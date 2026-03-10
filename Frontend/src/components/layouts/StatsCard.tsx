import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-5 rounded-xl shadow flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="text-indigo-600">{icon}</div>
    </motion.div>
  );
};

export default StatsCard;