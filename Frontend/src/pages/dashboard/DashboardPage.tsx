import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Trophy, Zap, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import CourseCard from "../../components/dashboard/courseCard";
import Course1 from "../../assets/course1.png";
import Course2 from "../../assets/course2.png";
import Course3 from "../../assets/course3.png";
import FocusChart from "../../components/dashboard/ProgressChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import StreakCard from "../../components/dashboard/streakCard";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { token, login } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);
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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

   useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data.data);

        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchDashboard();
    fetchUser();
  }, []);


  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-7"
      >
        <motion.div variants={item} className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[46px] font-bold tracking-[1px] inter">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="text-gray-600 text-lg inter">
              Your intellectual journey continues. You have 3 pending reviews
              and <br /> a streak to maintain.
            </p>
          </div>

          <StreakCard streak={dashboard?.streak} />
        </motion.div>

        <div className="flex gap-7 h-90 w-full">
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="h-full w-210 bg-white p-7 flex flex-col rounded-xl gap-3"
          >
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
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-[#085159] w-48 text-white rounded-lg mt-4 font-semibold flex gap-2 justify-center items-center"
            >
              Open Workplace <MoveRight size={20} />
            </motion.button>
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-[#085159] h-44 w-82 p-5 rounded-xl flex flex-col gap-3"
            >
              <div className="flex gap-4 justify-between items-center">
                <Trophy size={25} stroke="#b3dee3" />
                <p className="text-[#b3dee3] text-[10px]">WEEKLY GOAL</p>
              </div>
              <p className="text-3xl mt-2 text-[#b3dee3] font-semibold">
                85% Complete
              </p>
              <div className="w-full bg-[#117580] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1 }}
                  className="bg-white h-full"
                />
              </div>
              <p className="text-[#b3dee3] text-sm">
                12 problems solved this week
              </p>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-300 h-44 w-82 rounded-xl p-5 flex flex-col gap-4"
            >
              <p className="tracking-[2px] text-md text-[#585858]">
                UPCOMING LIVE EVENT
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-white rounded-xl"></div>
                <p className="font-semibold text-sm">
                  System Design: Scaling to 10M Users
                  <br />
                  <span className="text-sm font-light">Starts in 15 min</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div variants={item} className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">Active Curriculum</p>
            <p className="text-[#085159] cursor-pointer hover:underline">
              View Library
            </p>
          </div>

          <div className="flex gap-14">
            {[Course1, Course2, Course3].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CourseCard
                  title={
                    [
                      "Modern Rust: Memory Safety and Concurrency",
                      "Distributed Systems for High Availability",
                      "Functional Paradigms in Modern JavaScript",
                    ][i]
                  }
                  lessons={[24, 18, 32][i]}
                  progress={[65, 12, 88][i]}
                  level={["INTERMEDIATE", "ADVANCED", "MASTERCLASS"][i] as any}
                  image={img}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="flex gap-6 h-110 w-full">
          <motion.div variants={item} className="w-132 h-110">
            <RecentActivity activities={dashboard?.activities || []} />
          </motion.div>

          <motion.div variants={item} className="h-full w-full">
            <FocusChart data={dashboard?.focusData || []} />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage;
