import { ListFilter, ChevronDown, Play } from "lucide-react";

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


const MoreCourses = () => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Technical Curriculum</h3>

        <div className="flex gap-5 text-gray-700 font-semibold">
          <span className="flex items-center">
            Difficulty :
            <button className="flex gap-1 items-center ml-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition active:scale-95">
              All <ChevronDown size={16} />
            </button>
          </span>

          <button className="flex gap-2 items-center px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition active:scale-95">
            <ListFilter size={14} />
            Filter
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {courses.map((course, index) => {
          const progress = Math.round(
            (course.completed / course.lessons) * 100
          );
          const remaining = course.lessons - course.completed;

          return (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer will-change-transform"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={`${course.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={course.title}
                  className="w-full h-full object-cover will-change-transform"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

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
                  <div
                    className="h-full bg-linear-to-r from-[#0e6f7a] to-[#38bdf8] origin-left"
                  />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {progress}% completed
                  </span>

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0c5c65] text-white rounded-lg hover:bg-[#09474e] transition"
                  >
                    <Play size={14} />
                    Continue
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreCourses;