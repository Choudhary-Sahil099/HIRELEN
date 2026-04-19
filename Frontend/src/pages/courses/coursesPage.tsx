import DashboardLayout from "../../components/layouts/DashboardLayout";
import UpcomingCourses from "../../components/courses/upcomingCourses";
import MoreCouses from "../../components/courses/moreCourses";
import ExploreCourses from "../../components/courses/exploreCourses";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const Courses = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="flex flex-col gap-7 pt-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex justify-between items-center"
          variants={fadeUp}
        >
          <div className="flex flex-col gap-3">
            <h3 className="tracking-[1px] inter font-medium text-[#085159]">
              COURSE REPOSITORY
            </h3>

            <h1 className="text-5xl font-semibold inter leading-tight">
              Cultivate your technical
              <br /> mastery.
            </h1>

            <p className="text-lg tracking-wide text-gray-600">
              Explore structured paths designed by industry fellows, bridging
              the gap <br />
              between theoretical computer science and professional implementation.
            </p>
          </div>

          <div className="bg-gray-200 h-18 p-2 min-w-min mt-auto flex gap-2 rounded-xl inter justify-center items-center text-sm font-semibold">
            <button className="hover:bg-gray-100 p-3 rounded-lg">All Paths</button>
            <button className="hover:bg-gray-100 p-3 rounded-lg">Enrolled</button>
            <button className="hover:bg-gray-100 p-3 rounded-lg">Archives</button>

          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <UpcomingCourses />
        </motion.div>

        <motion.div variants={fadeUp}>
          <MoreCouses />
        </motion.div>

        <motion.div variants={fadeUp}>
          <ExploreCourses />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Courses;