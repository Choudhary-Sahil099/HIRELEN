import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.log("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc]">
      <Topbar user={user}/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 px-10 py-4 overflow-y-auto no-scrollbar">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;