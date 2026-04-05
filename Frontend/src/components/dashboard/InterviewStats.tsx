const InterviewStats = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Interview Performance
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Average Score</span>
          <span className="font-semibold">82%</span>
        </div>

        <div className="flex justify-between">
          <span>Best Score</span>
          <span className="font-semibold text-green-500">95%</span>
        </div>

        <div className="flex justify-between">
          <span>Interviews Taken</span>
          <span className="font-semibold">18</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewStats;