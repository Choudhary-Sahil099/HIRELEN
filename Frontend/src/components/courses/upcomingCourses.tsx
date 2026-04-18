import { FileTerminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const leftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const rightContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const rightItem = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const UpcomingCourses = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">

      <motion.div
        variants={leftVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-[#f5f7f6] rounded-2xl overflow-hidden"
      >
        <div className="flex h-full bg-white rounded-2xl shadow-sm">
          <div className="w-[45%] relative overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />

            <span className="absolute top-3 left-3 
              bg-white text-xs px-3 py-1 rounded-full font-medium 
              flex items-center gap-2 shadow-sm
              animate-[badgePulse_2s_ease-in-out_infinite]">

              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              NEW PATH
            </span>
          </div>
          <div className="w-[55%] p-6 flex flex-col justify-between">
            <div>
              <span className="bg-[#d9f3f6] text-[#0e6f7a] text-xs px-3 py-1 rounded-full font-medium">
                AI & ML
              </span>

              <h2 className="text-2xl font-semibold mt-3 text-[#0c4d54] leading-snug">
                The Architect's Guide to LLM Integration
              </h2>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                Master the structural patterns of modern large language models.
                Learn to design scalable, context-aware systems.
              </p>
            </div>

            <div className="flex flex-col mt-6 gap-5">
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <p className="text-sm font-semibold">Dr. Aris Thorne</p>
                  <p className="text-xs text-gray-500">
                    Principal Researcher, DeepMind
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#0c5c65] w-[60%] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0e6f7a] transition"
              >
                Start Fellowship
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={rightContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-rows-2 gap-3"
      >
        <motion.div
          variants={rightItem}
          className="bg-[#0e6f7a] text-[#b3dee3] rounded-2xl p-6 flex flex-col justify-between"
        >
          <div className="flex flex-col">
            <Sparkles stroke="#94d8e0" size={45} />
            <p className="text-xl opacity-80 mt-4">Your Velocity</p>
            <h3 className="text-lg tracking-[1px] font-semibold">
              You've completed 12 modules this week.
            </h3>
            <p className="text-sm opacity-70 mt-1">
              15% above target.
            </p>
          </div>

          <div className="w-full bg-white/20 h-2 rounded-full mt-2">
            <motion.div
              className="bg-[#b3dee3] h-full rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
        <motion.div
          variants={rightItem}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center">
              <FileTerminal
                size={50}
                stroke="#4e4f4f"
                className="bg-[#99bdc1] p-3 rounded-md"
              />
              <p className="text-xs text-gray-400 font-semibold">
                DAILY CHALLENGE
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-2">
              Recursive Optimization
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Solve the 'Backtracking Maze' using less than 128MB RAM.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-[#0e6f7a] font-medium mt-4 flex items-center gap-1 hover:cursor-pointer"
          >
            Solve Now →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpcomingCourses;