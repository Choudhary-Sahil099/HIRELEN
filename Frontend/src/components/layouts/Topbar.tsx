import { useAuth } from "../../context/AuthContext";
import { Bell, UserCircle } from "lucide-react";
const Topbar = () => {
  const { user, logout } = useAuth();
  // add the routes to the profile and the notifications
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="font-semibold">Welcome <span className="text-2xl text-indigo-700">{user?.name}</span></h1>

      <div className="flex items-center gap-6">
        <Bell size={23} className="cursor-pointer hover:scale-103 transition" />
        <UserCircle size={25} className="cursor-pointer hover:scale-103 transition" />
        <button
        onClick={logout}
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-300 hover:cursor-pointer hover:scale-103 transition"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Topbar;