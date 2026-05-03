import DashboardLayout from "../../components/layouts/DashboardLayout";
import AiImg from "../../assets/Aisession.png";
import { useState } from "react";
import { Target, Rocket, Bot, View, DatabaseZap,Layers,Timer,ChartNoAxesColumnIncreasing,Lock   } from "lucide-react";

const AIInterviewSelector = () => {
  const [difficulty, setDifficulty] = useState("Medium");
  const [topic, setTopic] = useState("DSA");
  const [time, setTime] = useState("15 Minutes");

  const topics = [
    "DSA",
    "System Design",
    "DBMS",
    "Operating System",
    "Networking",
  ];
  const times = ["15 Minutes", "30 Minutes", "45 Minutes", "60 Minutes"];
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center mt-15">
        <div className="h-140 w-250 rounded-xl flex shadow-lg overflow-hidden">
          <div className="relative w-100">
            <img
              src={AiImg}
              alt="AiSession"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20 text-white p-6 flex flex-col gap-3 justify-center">
              <h1 className="text-3xl font-bold">
                Step into the AI-Powered Interview
              </h1>

              <p className="text-white">
                Practice smarter and crack real interviews with confidence.
              </p>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <Bot
                    className="bg-[#22646B]/30 p-1.5 w-11 h-11 rounded-md shrink-0 "
                    stroke="#A0EFFF"
                  />
                  <div className="flex flex-col">
                    <span className="text-[18px] font-semibold">
                      AI Interviewer
                    </span>
                    <p className="text-[12px] text-gray-200">
                      {" "}
                      Experience intelligent, real-time adaptive questioning
                      that adjusts difficulty based on your answers{" "}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <DatabaseZap
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-md shrink-0 "
                    stroke="#A0EFFF"
                  />
                  <div className="flex flex-col">
                    <span className="text-[18px] font-semibold">
                      3000+ Questions
                    </span>
                    <p className="text-[12px] text-gray-200">
                      Large library of curated questions across DSA, system
                      design, and core subjects matching real interviews
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Target
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-md shrink-0 "
                    stroke="#A0EFFF"
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-semibold">
                      Mock AI Interviews
                    </span>
                    <p className="text-[12px] text-gray-200">
                      Simulate real interviews with timed sessions, pressure
                      handling, and structured evaluation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <View
                    className="bg-[#22646B]/30 p-2 w-11 h-11 rounded-md shrink-0 "
                    stroke="#A0EFFF"
                  />
                  <div className="flex flex-col">
                    <span className="text-[18px] font-semibold">
                      Cheating Detection
                    </span>
                    <p className="text-[12px] text-gray-200">
                      Detects tab switching, unusual activity, and suspicious
                      behavior for fair and genuine interview practice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-150 bg-white flex flex-col justify-center px-10 py-8 text-teal-900">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-2">
                Start Your AI Interview
              </h1>
              <p className="text-sm text-gray-500">
                Choose your preferences and begin your smart interview session
              </p>
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Layers size={15}/> Select Topic
              </label>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border rounded-xl p-3 hover:border-teal-700 transition outline-none"
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <ChartNoAxesColumnIncreasing size={15}/> Difficulty
              </label>

              <div className="grid grid-cols-3 gap-3">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`p-3 rounded-xl border text-sm transition ${
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
                <Timer size={15}/> Time Limit
              </label>

              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-xl p-3 hover:border-teal-700 transition outline-none"
              >
                {times.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <p className="text-xs text-gray-400 mt-1">
                You cannot pause the interview once started
              </p>
            </div>
            <button className="bg-teal-900 text-white py-4 rounded-xl text-lg hover:bg-teal-800 transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:cursor-pointer">
              <Rocket className="w-5 h-5" fill="white" />
              Start Interview
            </button>
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <div className="flex gap-2 border rounded-lg p-2 items-center justify-center">
                <Lock stroke="black" className="bg-teal-100 p-2 h-10 w-10 rounded-xl"/>
                <div>
                    <h1 className="text-teal-900 font-semibold text-lg">Secure & Fair</h1>
                    <p className="text-black">Ai-powered proctoring</p>
                </div>
                </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInterviewSelector;
