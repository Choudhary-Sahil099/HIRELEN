import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Brain, Users } from "lucide-react";

const InterviewMode = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-3xl font-bold mb-2">Start Interview</h1>
        <p className="text-gray-500 mb-10">
          Choose how you want to start your interview session
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">

          <div
            onClick={() => navigate("/practice-setup")}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <Brain className="text-indigo-500 mb-4" size={32} />

            <h2 className="text-xl font-semibold mb-2">
              Practice Interview
            </h2>

            <p className="text-gray-500 text-sm">
              AI-powered mock interview to help you prepare for real
              technical interviews.
            </p>
          </div>
          <div
            onClick={() => navigate("/join-interview")}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <Users className="text-indigo-500 mb-4" size={32} />

            <h2 className="text-xl font-semibold mb-2">
              Real Interview
            </h2>

            <p className="text-gray-500 text-sm">
              Join a live interview session with an interviewer.
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default InterviewMode;