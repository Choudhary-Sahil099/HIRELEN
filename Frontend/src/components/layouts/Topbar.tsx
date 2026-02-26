import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="font-semibold">Welcome {user?.name}</h1>

      <button
        onClick={logout}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;