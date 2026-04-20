import { motion } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UpcomingCourses from "../../components/courses/upcomingCourses";
import MoreCouses from "../../components/courses/moreCourses";
import ExploreCourses from "../../components/courses/exploreCourses";

const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Courses = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="flex flex-col gap-8 pt-6"
        variants={pageVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h3 className="tracking-[1px] font-medium text-[#085159]">
              COURSE REPOSITORY
            </h3>

            <h1 className="text-5xl font-semibold leading-tight">
              Cultivate your technical
              <br /> mastery.
            </h1>

            <p className="text-lg text-gray-600">
              Explore structured paths designed by industry fellows, bridging
              the gap <br />
              between theoretical computer science and professional implementation.
            </p>
          </div>

          <div className="bg-gray-200 p-2 flex gap-2 rounded-xl text-sm font-semibold">
            <button className="hover:bg-gray-100 p-3 rounded-lg transition active:scale-95">
              All Paths
            </button>
            <button className="hover:bg-gray-100 p-3 rounded-lg transition active:scale-95">
              Enrolled
            </button>
            <button className="hover:bg-gray-100 p-3 rounded-lg transition active:scale-95">
              Archives
            </button>
          </div>
        </div>

        <UpcomingCourses />
        <MoreCouses />
        <ExploreCourses />
      </motion.div>
    </DashboardLayout>
  );
};

export default Courses;