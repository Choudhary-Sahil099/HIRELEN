import { motion } from "framer-motion";

import ActivePeerRooms from "../../components/interview/ActiveRooms";
import RecentFeedback from "../../components/interview/AiFeedbacks";
import AiSchedule from "../../components/interview/AiSchedule";
import AiSession from "../../components/interview/AiSession";
import DashboardLayout from "../../components/layouts/DashboardLayout";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const InterviewMode = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="flex gap-9 w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-1 flex flex-col gap-6">
          <motion.div variants={fadeUp}>
            <AiSession />
          </motion.div>

          <motion.div variants={fadeUp}>
            <ActivePeerRooms />
          </motion.div>
        </div>
        <motion.div
          variants={fadeUp}
          className="bg-gray-200 p-6 rounded-2xl w-[320px] shrink-0 flex flex-col gap-5"
        >
          <AiSchedule />
          <RecentFeedback />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default InterviewMode;