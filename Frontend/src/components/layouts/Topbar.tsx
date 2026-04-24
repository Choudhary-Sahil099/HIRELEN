import { Bell, Settings, Search } from "lucide-react";

const Topbar = ({user}:any) => {
  
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center bg-[#f0f9fa] px-6 py-3 shadow-md border-gray-200 inter">

      <h1 className="font-semibold text-2xl text-teal-900">
        HireLens
      </h1>
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-center bg-gray-300 p-2 rounded-xl gap-2"><Search size={18} stroke='gray'/> <input className="bg-gray-300 rounded-xl h-8 outline-none" placeholder="Search archives...."/></div>
        <Bell stroke="#004D40" fill="#004D40"/>
        <Settings color="#004D40" fill="#004D40"/>
        <button className="bg-teal-900 px-4 py-2 rounded-xl text-white font-semibold hover:cursor-pointer hover:scale-105 transition-all">Execute Code</button>
          <img
        src={user?.avatar_url}
        alt="avatar"
        className="w-10 h-10 rounded-xl object-cover"
      />

      </div>
    </div>
  );
};

export default Topbar;