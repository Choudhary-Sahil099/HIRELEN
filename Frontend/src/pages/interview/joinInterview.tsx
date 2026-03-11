import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const JoinInterview = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const joinInterview = () => {
    if (!code) {
      alert("Please enter interview code");
      return;
    }

    navigate("/interview-room", {
      state: {
        mode: "real",
        interviewCode: code,
      },
    });
  };
  // future update -> the use can chose in the real interview that whether he plays as the interviewer or as the candidate.
  //when the user plays as the interviewer it will be given a code that he can share with the candidate via e-mail for establishing the connection between the interviewer and the candidate

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <h1 className="text-3xl font-bold mb-6">
          Join Interview
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Interview Code
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. eX34df56"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            onClick={joinInterview}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Join Interview
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default JoinInterview;