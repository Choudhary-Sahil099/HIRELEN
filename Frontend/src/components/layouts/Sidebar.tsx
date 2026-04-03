import {
  LayoutDashboard,
  Video,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  School,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/mainLogo.png";
import { motion } from "framer-motion";

const SideItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Problems", path: "/problems", icon: BarChart3 },
  { name: "Courses", path: "/courses", icon: School },
  { name: "Explore", path: "/explore", icon: Compass },
  { name: "Interview", path: "/interview", icon: Video },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div
      className={`h-screen ${
        minimized ? "w-20" : "w-64"
      } bg-white/80 backdrop-blur-xl border-r border-gray-200 
      shadow-[0_10px_30px_rgba(0,0,0,0.05)]
      p-4 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-8">
        {!minimized && (
          <motion.img
            src={Logo}
            className="w-36"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          />
        )}

        <button
          onClick={() => setMinimized(!minimized)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {minimized ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {SideItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                  
                  ${
                    isActive
                      ? "bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-600 shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {/* Glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-400/20 to-purple-400/20 blur-lg opacity-60"></div>
                  )}

                  <Icon
                    size={20}
                    className={`relative z-10 transition ${
                      isActive ? "text-indigo-600" : ""
                    }`}
                  />

                  {!minimized && (
                    <span className="relative z-10 font-medium">
                      {item.name}
                    </span>
                  )}
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Glow Accent */}
      <div className="mt-auto">
        {!minimized && (
          <div className="mt-6 p-4 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-lg">
            🚀 Upgrade your skills daily
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;