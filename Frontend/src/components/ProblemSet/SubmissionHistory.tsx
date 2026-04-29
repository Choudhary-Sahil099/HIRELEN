import { useEffect, useState } from "react";

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/submissions/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setSubmissions(data.data || []);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-4">
      {" "}
      <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th>Status</th>
            <th>Problem</th>
            <th>Runtime</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="border-b">
              <td
                className={
                  s.status === "accepted" ? "text-green-600" : "text-red-600"
                }
              >
                {s.status}
              </td>
              <td>{s.problem}</td>
              <td>{s.runtime} ms</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionHistory;
