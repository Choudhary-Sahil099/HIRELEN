type CourseCardProps = {
  title: string;
  lessons: number;
  progress: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MASTERCLASS";
  image: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  lessons,
  progress,
  level,
  image,
}) => {
  return (
    <div className="w-90 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className="relative h-60 w-full">
        <img
          src={image}
          alt="course"
          className="w-full h-full object-center"
        />
        <span className="absolute bottom-3 left-3 bg-white text-xs font-semibold px-3 py-1 rounded-md">
          {level}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3 h-40">
        <h2 className="text-lg font-semibold leading-snug line-clamp-2 min-h-14">
          {title}
        </h2>

        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>{lessons} Lessons</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#0e6f7a] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;