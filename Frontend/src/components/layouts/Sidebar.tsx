import { LayoutDashboard, Video, BarChart3, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-lg p-5 flex flex-col">

      <h1 className="text-2xl font-bold text-indigo-600 mb-10">
        AI Interview
      </h1>

      <nav className="flex flex-col gap-6 text-gray-600">

        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <LayoutDashboard size={20} />
          Dashboard
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <Video size={20} />
          Start Interview
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <BarChart3 size={20} />
          Analytics
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <Settings size={20} />
          Settings
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;