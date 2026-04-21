import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import SubmissionHeatmap from "../../components/Profile/SubmissionHeatmap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarCard from "../../components/Profile/avatarCard";
import ProfileCard from "../../components/Profile/ProfileCard";
import ActivityItem from "../../components/Profile/ActivityItems";
import SkillsMastery from "../../components/Profile/SkillMastery";
import EditProfileModal from "../../components/Profile/EditProfileModal";

import { mapSubmissionToActivity } from "../../utils/mapSubmission";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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
  const [profile, setProfile] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // 🔥 NEW

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setProfile(data.data);
  };

  const fetchActivities = async () => {
    const res = await fetch(
      "http://localhost:5000/api/submissions/user",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    const mapped = data.data.map(mapSubmissionToActivity);
    setActivities(mapped);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchProfile();
        await fetchActivities();
      } catch (err) {
        console.error("Profile page error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        <motion.div variants={item}>
          <AvatarCard
            name={profile.name}
            bio={profile.bio}
            avatar={profile.avatar_url}
            rating={profile.rating}
            title={profile.title}
            followers={profile.followers || 0}
            following={profile.following || 0}
            onEdit={() => setShowModal(true)}
          />
        </motion.div>
        <motion.div variants={item} className="grid grid-cols-3 gap-6">
          <ProfileCard
            icon="solved"
            color="blue"
            label="Problems Solved"
            value={profile.total_solved || 0}
            topRightText=""
          />

          <ProfileCard
            icon="rank"
            color="orange"
            label="Global Rank"
            value={`#${profile.global_rank || 0}`}
            topRightText=""
          />

          <ProfileCard
            icon="winrate"
            color="cyan"
            label="Rating"
            value={profile.rating}
            topRightText={profile.title}
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
      {showModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowModal(false)}
          onUpdate={fetchProfile}
        />
      )}

    </DashboardLayout>
  );
};

export default UserProfile;