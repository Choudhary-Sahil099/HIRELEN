import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<any>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProblem(data);
    };

    fetchProblem();
  }, [id]);

  if (!problem) return <div>Loading...</div>;

  return (
      <div className="flex gap-6 p-4">
        <div className="w-1/2 bg-white p-6 rounded-xl flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{problem.title}</h1>

          <span className="text-sm uppercase text-gray-500">
            {problem.difficulty}
          </span>

          <p>{problem.description}</p>

          <div>
            <h2 className="font-semibold">Constraints</h2>
            <p className="text-gray-600">{problem.constraints}</p>
          </div>

          <div>
            <h2 className="font-semibold">Sample Test Cases</h2>

            {problem.sampleTestCases.map((tc: any, i: number) => (
              <div key={i} className="bg-gray-100 p-3 rounded mt-2">
                <p><strong>Input:</strong> {tc.input}</p>
                <p><strong>Output:</strong> {tc.output}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 bg-white p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Code Editor</h2>

          <textarea
            className="w-full h-80 border rounded-md p-2"
            placeholder="Write your code here..."
          />

          <button className="mt-4 bg-[#0e6f7a] text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
  );
};

export default ProblemDetail;