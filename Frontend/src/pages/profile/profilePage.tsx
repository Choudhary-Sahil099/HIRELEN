import { motion } from "framer-motion";
import SubmissionHeatmap from "../../components/Profile/SubmissionHeatmap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarCard from "../../components/Profile/avatarCard";
import ProfileCard from "../../components/Profile/ProfileCard";
import ActivityItem from "../../components/Profile/ActivityItems";
import SkillsMastery from "../../components/Profile/SkillMastery";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const UserProfile = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        
        <motion.div variants={item}>
          <AvatarCard />
        </motion.div>
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-6"
        >
          <ProfileCard
            icon="solved"
            color="blue"
            label="Problems Solved"
            value="1,482"
            topRightText="+12 this week"
          />

          <ProfileCard
            icon="rank"
            color="orange"
            label="Global Rank"
            value="#214"
            topRightText="Top 0.1%"
          />

          <ProfileCard
            icon="winrate"
            color="cyan"
            label="Contest Win Rate"
            value="78.4%"
            topRightText="Excellent"
          />
        </motion.div>
        <motion.div variants={item}>
          <SubmissionHeatmap />
        </motion.div>

        <motion.div
          variants={item}
          className="flex gap-4"
        >
          
          <div className="flex-1">
            <SkillsMastery />
          </div>
          <div className="bg-white rounded-2xl p-6 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:underline">
                View Journal
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <ActivityItem
                title="LRU Cache Implementation"
                difficulty="hard"
                category="Data Structures"
                time="2 hours ago"
                runtime="12ms"
                status="success"
              />

              <ActivityItem
                title="Dijkstra's Shortest Path"
                difficulty="medium"
                category="Algorithms"
                time="5 hours ago"
                runtime="8ms"
                status="success"
              />

              <ActivityItem
                title="Matrix Chain Multiplication"
                difficulty="hard"
                category="Dynamic Programming"
                time="Yesterday"
                status="tle"
              />

              <ActivityItem
                title="Binary Tree Zigzag"
                difficulty="medium"
                category="Trees"
                time="Yesterday"
                status="error"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserProfile;