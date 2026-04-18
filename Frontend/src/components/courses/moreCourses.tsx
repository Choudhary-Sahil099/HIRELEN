import { ListFilter, ChevronDown, Play } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Data Structures & Algorithms",
    lessons: 120,
    completed: 84,
    difficulty: "Hard",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    color: "bg-red-500",
  },
  {
    title: "Frontend Development (React)",
    lessons: 80,
    completed: 36,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    color: "bg-yellow-500",
  },
  {
    title: "Backend Development (Node.js)",
    lessons: 65,
    completed: 20,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    color: "bg-yellow-500",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const},
  },
};

const MoreCourses = () => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Technical Curriculum</h3>

        <div className="flex gap-5 text-gray-700 font-semibold">
          <span className="flex items-center">
            Difficulty :
            <button className="flex gap-1 items-center ml-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">
              All <ChevronDown size={16} />
            </button>
          </span>

          <button className="flex gap-2 items-center px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">
            <ListFilter size={14} />
            Filter
          </button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {courses.map((course, index) => {
          const progress = Math.round(
            (course.completed / course.lessons) * 100
          );
          const remaining = course.lessons - course.completed;

          return (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
            >
              <div className="relative h-44 w-full overflow-hidden group">
                <motion.img
                  src={`${course.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                <span
                  className={`absolute bottom-3 left-3 text-xs px-3 py-1 rounded-full text-white font-medium ${course.color}`}
                >
                  {course.difficulty}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h4 className="text-lg text-[#0c4d54] font-semibold leading-snug">
                  {course.title}
                </h4>

                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{course.lessons} Lessons</span>
                  <span>{remaining} left</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-[#0e6f7a] to-[#38bdf8] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {progress}% completed
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0c5c65] text-white rounded-lg hover:bg-[#09474e] transition"
                  >
                    <Play size={14} />
                    Continue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MoreCourses;