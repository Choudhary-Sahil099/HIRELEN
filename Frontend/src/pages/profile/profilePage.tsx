import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import SubmissionHeatmap from "../../components/Profile/SubmissionHeatmap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarCard from "../../components/Profile/avatarCard";
import ProfileCard from "../../components/Profile/ProfileCard";
import ActivityItem from "../../components/Profile/ActivityItems";
import SkillsMastery from "../../components/Profile/SkillMastery";

import { mapSubmissionToActivity } from "../../utils/mapSubmission";

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
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/submissions/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const mapped = data.data.map(mapSubmissionToActivity);

        setActivities(mapped);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
        <motion.div variants={item} className="grid grid-cols-3 gap-6">
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

        <motion.div variants={item} className="flex gap-4">
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
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : activities.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No activity yet
                </p>
              ) : (
                activities
                  .slice(0, 5)
                  .map((item, index) => (
                    <ActivityItem key={index} {...item} />
                  ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserProfile;