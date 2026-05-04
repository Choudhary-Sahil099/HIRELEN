import { Settings, CircleQuestionMark, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const AiRoomNav: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number): string => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = secs % 60;

    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white sticky top-0 z-50 flex justify-between items-center px-6 py-3 shadow-sm border-gray-200 inter">
      <div className="flex justify-center items-center gap-4">
        <h1 className="font-semibold text-xl text-teal-900">
          The Intellectual Sanctuary
        </h1>
        <span
          className=" 
              bg-teal-800/40 text-xs px-3 py-1 rounded-full font-semibold
              flex items-center gap-2
              animate-[badgePulse_2s_ease-in-out_infinite] text-teal-900"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Session Active
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className=" flex  gap-2 items-center justify-center bg-gray-100 px-3 py-2 rounded-xl">
          <Clock size={17} stroke="#004650" />
          <span className="inter text-md font-semibold text-teal-800">
            {formatTime(seconds)}
          </span>
        </div>
        <CircleQuestionMark stroke="gray" className="hover:cursor-pointer" />
        <Settings stroke="gray" className="hover:cursor-pointer" />
        <button className="bg-[#004650] px-4 py-2 rounded-xl text-white font-semibold hover:cursor-pointer hover:scale-105 transition-all">
          EndSession
        </button>
      </div>
    </div>
  );
};

export default AiRoomNav;
