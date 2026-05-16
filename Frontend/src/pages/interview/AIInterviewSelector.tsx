import DashboardLayout from "../../components/layouts/DashboardLayout";
import AiImg from "../../assets/Aisession.png";
import { useState } from "react";
import {
  Target,
  Rocket,
  Bot,
  View,
  DatabaseZap,
  Layers,
  Timer,
  ChartNoAxesColumnIncreasing,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIInterviewSelector = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Easy");
  const [time, setTime] = useState("30 Minutes");
  const [loading, setLoading] = useState(false);

  const topics = [
    "DSA",
    "SYSTEM_DESIGN",
    "BACKEND",
    "FRONTEND",
  ];

  const times = [
    "30 Minutes",
    "45 Minutes",
    "60 Minutes",
  ];
  const getTimeLimit = () => {
    switch(time){
      case "30 minutes":
        return 30;
       case "45 Minutes":
      return 45;

    case "60 Minutes":
      return 60;

    default:
      return 30;
    }

  }
  const getQuestionCount = () => {
    switch (time) {
      case "30 Minutes":
        return 1;

      case "45 Minutes":
        return 2;

      case "60 Minutes":
        return 3;

      default:
        return 3;
    }
  };

  const handleStartInterview = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/interview/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            domain,
            type: "AI",
            difficulty,
            totalQuestions: getQuestionCount(),
            timeLimit: getTimeLimit(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to start interview");
      }
      navigate(
        `/aiRoom?sessionId=${data.sessionId}`
      );

    } catch (err) {
      console.error(err);
      alert("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center mt-15 pb-10">
        <div className="min-h-175 w-250 rounded-2xl flex shadow-xl overflow-hidden bg-white">
          <div className="relative w-[40%]">
            <img
              src={AiImg}
              alt="AiSession"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 text-white p-6 flex flex-col justify-center gap-6">
              <div>
                <h1 className="text-3xl font-bold leading-tight">
                  Step into the
                  <br />
                  AI-Powered Interview
                </h1>

                <p className="text-sm text-gray-200 mt-3">
                  Practice smarter and crack real interviews with confidence.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <Bot
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-lg shrink-0"
                    stroke="#A0EFFF"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      AI Interviewer
                    </h2>

                    <p className="text-xs text-gray-200 leading-relaxed">
                      Intelligent adaptive questioning based on your responses
                      and coding performance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <DatabaseZap
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-lg shrink-0"
                    stroke="#A0EFFF"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      Large Question Bank
                    </h2>

                    <p className="text-xs text-gray-200 leading-relaxed">
                      Curated interview-style questions inspired by real
                      engineering interviews.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Target
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-lg shrink-0"
                    stroke="#A0EFFF"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      Mock Interview Experience
                    </h2>

                    <p className="text-xs text-gray-200 leading-relaxed">
                      Simulates real interview pressure with timers,
                      evaluation, and structured sessions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <View
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-lg shrink-0"
                    stroke="#A0EFFF"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      Smart Monitoring
                    </h2>

                    <p className="text-xs text-gray-200 leading-relaxed">
                      Detects suspicious behavior and helps maintain fair
                      interview simulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[60%] bg-white flex flex-col justify-center px-10 py-8 text-teal-900">

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                Start Your AI Interview
              </h1>

              <p className="text-sm text-gray-500">
                Choose your preferences and begin your smart interview session
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Layers size={15} stroke="teal" />
                Select Topic
              </label>

              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full border rounded-xl p-3 hover:border-teal-700 transition outline-none"
              >
                {topics.map((topic) => (
                  <option
                    key={topic}
                    value={topic}
                  >
                    {topic.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <ChartNoAxesColumnIncreasing
                  size={15}
                  stroke="teal"
                />
                Difficulty
              </label>

              <div className="grid grid-cols-3 gap-3">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-3 rounded-xl border text-sm transition font-medium ${
                      difficulty === level
                        ? "bg-teal-900 text-white shadow-md"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Timer size={15} stroke="teal" />
                Time Limit
              </label>

              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-xl p-3 hover:border-teal-700 transition outline-none"
              >
                {times.map((t) => (
                  <option
                    key={t}
                    value={t}
                  >
                    {t}
                  </option>
                ))}
              </select>

              <p className="text-xs text-gray-400 mt-2">
                The interview cannot be paused once started.
              </p>
            </div>

            <button
              onClick={handleStartInterview}
              disabled={loading}
              className="bg-teal-900 text-white py-4 rounded-xl text-lg hover:bg-teal-800 transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 hover:cursor-pointer"
            >
              <Rocket
                className="w-5 h-5"
                fill="white"
              />

              {loading
                ? "Starting..."
                : "Start Interview"}
            </button>

            <div className="mt-5">
              <div className="flex gap-3 border rounded-xl p-3 items-center">
                <Lock
                  stroke="black"
                  className="bg-teal-100 p-2 h-11 w-11 rounded-xl shrink-0"
                />

                <div>
                  <h1 className="text-teal-900 font-semibold text-lg">
                    Secure & Fair
                  </h1>

                  <p className="text-black text-sm">
                    AI-powered monitoring and interview integrity checks
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInterviewSelector;