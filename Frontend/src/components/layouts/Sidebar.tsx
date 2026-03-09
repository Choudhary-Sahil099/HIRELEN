import { LayoutDashboard, Video, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

//LogoDesign for the website
//creating array of the sidebar menu
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
  return (
    <div className="h-screen w-64 bg-white shadow-lg p-5 flex flex-col">

      <h1 className="text-2xl font-bold text-indigo-600 mb-10">
        HireLens
      </h1>

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
              {item.name}
            </NavLink>
          );
        })}

      </nav>
    </div>
  );
};

export default Sidebar;