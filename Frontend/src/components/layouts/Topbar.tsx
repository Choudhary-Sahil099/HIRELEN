import { useAuth } from "../../context/AuthContext";
import { Bell, UserCircle } from "lucide-react";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center bg-white px-6 py-3 border-b border-gray-200">

      {/* Left */}
      <h1 className="font-semibold">
        Welcome{" "}
        <span className="text-2xl text-indigo-700">
          {user?.name}
        </span>
      </h1>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell
          size={26}
          className="cursor-pointer hover:scale-105 transition text-indigo-700 bg-indigo-200 rounded-xl p-1"
        />

        <UserCircle
          size={26}
          className="cursor-pointer hover:scale-105 transition text-indigo-700"
        />

        <button
          onClick={logout}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;