import DashboardLayout from "../../components/layouts/DashboardLayout";
import SubmissionHeatmap from "../../components/dashboard/SubmissionHeatmap";
import RecentProblems from "../../components/dashboard/RecentProblems";
import InterviewStats from "../../components/dashboard/InterviewStats";
import DailyChallenge from "../../components/dashboard/DailyChallenge";
import { motion } from "framer-motion";
import { Brain, BarChart3, Trophy, Target, Flame, Zap , MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import CircularProgress from "../../components/dashboard/Progress";

const stats = [
  {
    title: "Problems Solved",
    value: "120",
    icon: <Target />,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Contests",
    value: "8",
    icon: <Trophy />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "AI Interviews",
    value: "18",
    icon: <Brain />,
    color: "from-purple-400 to-indigo-500",
  },
  {
    title: "Accuracy",
    value: "82%",
    icon: <BarChart3 />,
    color: "from-blue-400 to-cyan-500",
  },
];

const DashboardPage = () => {
  const { token, login } = useAuth();
  const [user, setUser] = useState<any>(null);
  const getName = () => {
    const rawName = user?.name || user?.email?.split("@")[0] || "";
    return rawName.charAt(0).toUpperCase() + rawName.slice(1);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      login(urlToken);
      window.history.replaceState({}, document.title, "/dashboard");

      try {
        const decoded = jwtDecode(urlToken);
        setUser(decoded);
      } catch {
        console.error("Invalid token");
      }

      return;
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        console.error("Invalid token");
      }
    }
  }, [token]);
  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-7">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-[46px] font-bold tracking-[1px]">
              Welcome back{user ? `, ${getName()}` : ""}.
            </h1>
            <p className="text-gray-600 text-lg">
              Your intellectual journey continues. You have 3 pending reviews
              and <br /> a streak to maintain.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-gray-100 flex justify-center items-center px-5 py-3 gap-2 rounded-lg">
              <div className="p-1 bg-[#d9e1dc] rounded-lg">
                <Flame fill="#085159" stroke="#085159" size={40} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[12px]">ACTIVE STREAK</h3>
                <span className="font-semibold text-xl">14 Days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-7 h-90 w-full">
          <div className="h-full w-210 bg-white p-7 flex flex-col rounded-xl gap-3">
            <div className="flex gap-2 items-center">
              <p className="text-[12px] font-semibold p-2 bg-[#d1eee4] rounded-sm text-[#085159]">
                DAILY CHALLENGE
              </p>
              <p>Ends in 4h12m</p>
            </div>
            <h1 className="text-4xl font-semibold">
              Optimizing the Red-Black Tree <br /> Balancing Algorithm
            </h1>
            <div className="flex gap-4 mt-2 text-sm text-[#043229]">
              <p>Advance Algorithm Complexity</p>
              <p className="flex gap-1 items-center">
                <Zap size={14} fill="#085159" stroke="#085159" /> 450 XP
              </p>
            </div>
            <button className="p-3 bg-[#085159] w-48 text-white rounded-lg mt-4 font-semibold flex gap-2 justify-center items-center">
              Open Workplace <MoveRight size={20}  />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#085159] h-44 w-82 p-5 rounded-xl flex flex-col gap-3">
              <div className="flex gap-4 justify-between items-center">
                <Trophy size={25} stroke="#b3dee3" />
                <p className="text-[#b3dee3] text-[10px]">WEEKLY GOAL</p>
              </div>
              <p className="text-3xl mt-2 text-[#b3dee3] font-semibold">85% Complete</p>
              <div className="w-full bg-[#117580] rounded-full h-2 overflow-hidden">
                <div className="bg-white h-full transition-all duration-300" style={{width: "85%"}} />
              </div>
              <p className="text-[#b3dee3] text-sm">12 problems solved this week</p>
            </div>
            <div className="bg-gray-300 h-44 w-82 rounded-xl p-5 flex flex-col gap-4">
              <p className="tracking-[2px] text-md text-[#585858]">UPCOMING LIVE EVENT</p>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-white rounded-xl"> </div>
                <p className="font-semibold text-sm">System Design: Scaling to 10M Users<br/> <span className="text-sm font-light">Starts in 15 min</span></p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
