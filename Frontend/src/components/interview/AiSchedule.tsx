import { CirclePlus } from "lucide-react";

type ScheduleCardProps = {
  date: string;
  time: string;
  title: string;
};
const ScheduleCard = ({ date, time, title }: ScheduleCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">

      <div className="bg-blue-100 text-teal-800 rounded-lg px-3 py-2 text-center">
        <p className="text-xs font-semibold">OCT</p>
        <p className="text-lg font-bold leading-none">{date}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 font-medium">{time}</p>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
      </div>
    </div>
  );
};

const AiSchedule = () => {
  return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">AI Schedule</h3>

        <div className="bg-teal-700 p-2 rounded-full cursor-pointer hover:bg-teal-800 transition">
          <CirclePlus className="text-white w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ScheduleCard
          date="24"
          time="09:30 AM"
          title="FAANG Prep Simulation"
        />

        <ScheduleCard
          date="26"
          time="02:00 PM"
          title="Behavioral Analysis"
        />
      </div>
    </div>
  );
};

export default AiSchedule;