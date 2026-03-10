//LogoDesign for the website
//creating array of the sidebar menu
import { LayoutDashboard, Video, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Start Interview",
    path: "/interview",
    icon: Video,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC = () => {
  const[minimized, setMinimized] = useState(false)
  return (
    <div className={`h-screen bg-white shadow-lg p-5 flex flex-col transition-all duration-300 ${minimized ? "w-20":"w-64"}`}>

      <div className="flex items-center justify-between py-4 pb-10">

        {!minimized && (
          <h1 className="text-2xl font-bold text-indigo-600">
           HireLens
          </h1>
        )}

        <button
          onClick={() => setMinimized(!minimized)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {minimized ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

      </div>

      <nav className="flex flex-col gap-2">

        {SideItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              {!minimized && <span>{item.name}</span>}
            </NavLink>
          );
        })}

      </nav>
    </div>
  );
};

export default Sidebar;