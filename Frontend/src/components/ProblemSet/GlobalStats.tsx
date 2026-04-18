import { Fingerprint } from "lucide-react";

const GlobalStats = () => {
  return (
    <div className="relative bg-white/50 p-7 rounded-xl overflow-hidden inter">
      <Fingerprint
        className="absolute bottom-2 right-2 
                   w-19 h-19 text-[#97adaf] 
                   pointer-events-none"
      />

      <p className="text-md font-semibold text-[#1b6354]">
        GLOBAL VELOCITY
      </p>

      <h2 className="text-3xl font-semibold mt-2 text-[#0c4d54]">
        Top 5%
      </h2>
      <div className="w-full bg-gray-200 h-2.5 rounded-xl mt-6 relative z-10">
        <div className="bg-linear-to-r from-[#0e6f7a] to-[#38bdf8] h-full rounded-l-xl w-[80%]" />
      </div>
    </div>
  );
};

export default GlobalStats;