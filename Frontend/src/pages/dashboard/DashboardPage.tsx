import DashboardLayout from "../../components/layouts/DashboardLayout";
import SubmissionHeatmap from "../../components/dashboard/SubmissionHeatmap";
import RecentProblems from "../../components/dashboard/RecentProblems";
import InterviewStats from "../../components/dashboard/InterviewStats";
import DailyChallenge from "../../components/dashboard/DailyChallenge";
import { motion } from "framer-motion";
import { Brain, BarChart3, Trophy, Target } from "lucide-react";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      login(urlToken);
      window.history.replaceState({}, document.title, "/dashboard");
    }
    const finalToken = urlToken || token;

    if (finalToken) {
      try {
        const decoded: any = jwtDecode(finalToken);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, [token]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto px-6 md:px-6 py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back
            {user ? `, ${user.name || user.email?.split("@")[0]}` : ""} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Track your progress and level up your coding skills
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="relative p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-r ${item.color} opacity-10`}
              />

              <div className="relative flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                </div>
                <div className="text-gray-700">{item.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 py-4 px-5 bg-white rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <CircularProgress />
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Global Rank</h3>

            <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              #1,245
            </div>

            <p className="text-gray-500 mt-2 text-sm">Top 15% worldwide</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md">
          <SubmissionHeatmap />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RecentProblems />
          </div>
          <div className="space-y-6">
            <InterviewStats />
            <DailyChallenge />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
