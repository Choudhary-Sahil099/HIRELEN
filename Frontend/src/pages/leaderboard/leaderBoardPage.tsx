import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import LeaderboardHeader from "../../components/leaderBoard/leaderBoardHeader";
import TopUserCard from "../../components/leaderBoard/sideCard";
import ChampionCard from "../../components/leaderBoard/championCard";
import LeaderboardTable from "../../components/leaderBoard/leaderBoardTable";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const Leaderboard = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="flex flex-col gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <LeaderboardHeader />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-6 items-center"
        >
          <motion.div whileHover={{ y: -5, scale: 1.03 }}>
            <TopUserCard
              name="Alex Chen"
              rating="2,840"
              avatar="https://i.pravatar.cc/100?img=4"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ChampionCard />
          </motion.div>

          <motion.div whileHover={{ y: -5, scale: 1.03 }}>
            <TopUserCard
              name="Liam Walsh"
              rating="2,795"
              avatar="https://i.pravatar.cc/100?img=7"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <LeaderboardTable />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-200 p-3 font-semibold rounded-xl text-sm"
          >
            Load more scholars
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Leaderboard;