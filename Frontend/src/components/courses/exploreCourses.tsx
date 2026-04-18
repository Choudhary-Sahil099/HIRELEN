import { Play } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Python (AI/ML)",
    lessons: 120,
    difficulty: "Hard",
    description:
      "Learn Python for AI/ML, covering NumPy, Pandas, data preprocessing, and building machine learning models with real datasets.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    color: "bg-red-500",
  },
  {
    title: "Cyber Security",
    lessons: 80,
    difficulty: "Medium",
    description:
      "Understand ethical hacking, network security, cryptography, and how to protect systems from real-world cyber threats.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    color: "bg-yellow-500",
  },
  {
    title: "DevOps",
    lessons: 65,
    difficulty: "Medium",
    description:
      "Master CI/CD pipelines, Docker, Kubernetes, and cloud deployment to automate and scale modern applications.",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b",
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

const ExploreCourses = () => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <h3 className="text-2xl font-semibold">Explore</h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {courses.map((course, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
          >
            <div className="relative h-44 w-full overflow-hidden">
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
              <h4 className="text-lg text-[#0c4d54] font-semibold">
                {course.title}
              </h4>

              <p className="text-sm text-gray-500 leading-relaxed">
                {course.description}
              </p>

              <div className="text-xs text-gray-400">
                {course.lessons} Lessons
              </div>
              <div className="flex justify-between items-center mt-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0c5c65] text-white rounded-lg hover:bg-[#09474e] transition"
                >
                  <Play size={14} />
                  Explore Course
                </motion.button>

                <span className="text-xs text-gray-400">
                  Beginner Friendly
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExploreCourses;