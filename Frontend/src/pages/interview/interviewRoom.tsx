import DashboardLayout from "../../components/layouts/DashboardLayout";

const InterviewRoom = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">

        <div className="flex-1 bg-black rounded-xl flex items-center justify-center text-white">
          Candidate Video Feed
        </div>

        <div className="w-96 bg-white rounded-xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Current Question</h2>
            
            {/* this will the interviewer to paste the ques here and the ques will be visible to both the interviewer and the candidate */}
          <div className="flex-1 bg-gray-100 rounded p-3"> 
            Question will appear here...
          </div>

          <button className="mt-4 bg-black text-white py-2 rounded">
            Next Question
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default InterviewRoom;