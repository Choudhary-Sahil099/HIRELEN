import { BarChart3, Clock } from "lucide-react";

type RoomCardProps = {
  tag: string;
  title: string;
  level: string;
  time: string;
  progress: number; 
  tagColor: string;
};

const RoomCard = ({
  tag,
  title,
  level,
  time,
  progress,
  tagColor,
}: RoomCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold px-3 py-1 inter rounded-full ${tagColor}`}>
          {tag}
        </span>
        <div className="flex -space-x-2">
          <img
            src="https://i.pravatar.cc/30?img=1"
            className="w-6 h-6 rounded-full border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/30?img=2"
            className="w-6 h-6 rounded-full border-2 border-white"
          />
          <div className="w-6 h-6 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white">
            +2
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 leading-snug text-xl inter">
        {title}
      </h3>

      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1 font-semibold">
          <BarChart3 className="w-4 h-4" />
          {level}
        </div>

        <div className="flex items-center gap-1 font-semibold">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>

      <div className="w-full h-2 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="h-full bg-teal-700 rounded-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ActivePeerRooms = () => {
  return (
    <div className="flex flex-col gap-6 mt-7">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold inter">Active Peer Rooms</h2>
          <p className="text-sm text-gray-500 font-semibold">
            Join a live practice session with engineers worldwide
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">
            Filters
          </button>
          <button className="bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <RoomCard
          tag="SYSTEM DESIGN"
          title="Scalable Microservices Workshop"
          level="Expert"
          time="45m left"
          progress={70}
          tagColor="bg-blue-100 text-blue-800"
        />

        <RoomCard
          tag="ALGORITHMS"
          title="Dynamic Programming Deep-Dive"
          level="Intermediate"
          time="12m left"
          progress={40}
          tagColor="bg-gray-200 text-gray-700"
        />

        <RoomCard
          tag="FRONT-END ARCHITECTURE"
          title="React Performance & Concurrent Mode"
          level="Advanced"
          time="2h left"
          progress={85}
          tagColor="bg-orange-100 text-orange-800"
        />
      </div>
    </div>
  );
};

export default ActivePeerRooms;