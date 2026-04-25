import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const { id } = useParams();

  const [problem, setProblem] = useState<any>(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResult(null);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/submissions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          problemId: Number(id),
          code,
          language: "cpp",
        }),
      });

      const data = await res.json();

      setResult(data.data);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="flex gap-6 px-10 pt-6 pb-2 bg-gray-100 inter">
      <div className="w-1/3 bg-[#F7FAFC] p-6 rounded-xl flex flex-col gap-4 h-170 overflow-y-auto no-scrollbar">
        <h1 className="text-4xl font-bold text-teal-900">
          {problem.id}. {problem.title}
        </h1>

        <p className="inline-block text-sm uppercase text-gray-700 bg-blue-300 px-3 py-1 rounded-md">
          {problem.difficulty}
        </p>

        <p className="text-lg font-semibold">{problem.description}</p>

        <div>
          <h2 className="font-semibold text-lg">Examples : </h2>

          {problem.examples?.map((ex: any, i: number) => (
            <div
              key={i}
              className="bg-gray-100 text-teal-900 p-4 rounded-lg mt-3 text-sm font-mono"
            >
              <p className="font-semibold mb-2 flex text-xl items-center "><Dot/><span>Example {i + 1}:</span></p>

              <div className="p-4 bg-white rounded-lg font-semibold">
                <p>
                <span className="text-gray-500 text-md font-semibold">Input:</span>{" "}
                {ex.input}
              </p>

              <p>
                <span className="text-gray-500 font-semibold">Output:</span>{" "}
                {ex.output}
              </p>

              {ex.explanation && (
                <p>
                  <span className="font-semibold text-gray-500">Explanation:</span>{" "}
                  {ex.explanation}
                </p>
              )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2" >
          <p className="text-lg font-semibold text-teal-900">Constraints: </p>
          <div className="bg-gray-200 p-2 rounded-xl">
            {problem.constraints}
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-white p-6 rounded-xl">
        <h2 className="font-semibold mb-4">Code Editor</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 border rounded-md p-2"
          placeholder="Write your code here..."
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-[#0e6f7a] text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {result && (
          <div className="mt-4 p-3 rounded bg-gray-100">
            <p className="font-semibold">
              Status:{" "}
              <span
                className={
                  result.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {result.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;
