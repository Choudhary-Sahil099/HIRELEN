const interviews = [
  { name: "Aryan", score: 84, status: "Passed", date: "Mar 3" },
  { name: "Shivanshi", score: 65, status: "Review", date: "Mar 5" },
  { name: "Sujal", score: 91, status: "Passed", date: "Mar 6" },
];

// contains the last 3 interviews conducted by you or you appeared in 
// future updates -> you have the right to choose that you are either the interviewer or the candidate and the adding of new headers such as role and the score you achieved and the second is that after the interview is over a report may be issued to the candidate having the scores of the interview through e-mail services
const RecentInterviews = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Recent Interviews
      </h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="pb-2">Candidate</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{interview.name}</td>
              <td>{interview.score}%</td>
              <td
                className={
                  interview.status === "Passed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }
              >
                {interview.status}
              </td>
              <td>{interview.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentInterviews;