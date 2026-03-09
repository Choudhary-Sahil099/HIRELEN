import { useAuth } from "../../context/AuthContext";
import { Bell, UserCircle } from "lucide-react";
const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="font-semibold">Welcome {user?.name}</h1>

      <div className="flex items-center gap-6">
        <Bell size={23} className="cursor-pointer" />
        <UserCircle size={25} className="cursor-pointer" />
        <button
        onClick={logout}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Topbar;