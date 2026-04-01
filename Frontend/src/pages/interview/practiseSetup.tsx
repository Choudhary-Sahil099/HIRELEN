import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const PracticeSetup = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const startPractice = () => {
    if (!topic || !difficulty) {
      alert("Please select topic and difficulty");
      return;
    }
    navigate("/interview-room", {
      state: {
        mode: "practice",
        topic,
        difficulty,
      },
    });
  };
  // future update -> have more options in the topic section(like leetcode) but only available when the backend is in the production
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <h1 className="text-3xl font-bold mb-6">
          Practice Interview Setup
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Topic
            </label>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Choose Topic</option>
              <option value="dsa">DSA</option>
              <option value="react">React</option>
              <option value="system-design">System Design</option>
              <option value="machine-learning">Machine Learning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Choose Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            onClick={startPractice}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Start Practice Interview
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default PracticeSetup;