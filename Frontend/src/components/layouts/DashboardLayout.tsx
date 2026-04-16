import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-[#f8fafc]">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 px-10 py-4 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;