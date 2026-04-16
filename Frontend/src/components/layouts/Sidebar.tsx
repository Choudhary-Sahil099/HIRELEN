import {
  LayoutDashboard,
  Code,
  Trophy,
  School,
  Video,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", path: "/courses", icon: School },
  { name: "Problems", path: "/problems", icon: Code },
  {name: "Interview" , path: "/interview", icon:Video},
  { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { name: "Profile", path: "/profile", icon: Settings },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#f8fafc] h-full p-4 flex flex-col gap-4">
      <div className="p-4 flex-col">
        <h3 className="text-xl font-medium text-[#006064]">Academic Santuary</h3>
        <p>Senior Fellow
        </p>
      </div>
      <nav className="flex flex-col gap-2">
        {SideItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-sm cursor-pointer transition
                  
                  ${
                    isActive
                      ? "bg-white shadow-sm text-[#085159]"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon size={20} />

                  <span className="text-[16px] font-medium">
                    {item.name}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;