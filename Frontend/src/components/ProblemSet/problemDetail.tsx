import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorPanel from "./Editorial";
const ProblemDetail = ({ runTrigger, submitTrigger }: any) => {
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
    <div className="flex gap-4 px-3 pt-3 pb-2 bg-gray-100 inter">
      <div className="w-120 bg-[#F7FAFC] p-6 rounded-xl flex flex-col gap-4 h-174 overflow-y-auto no-scrollbar">
        <h1 className="text-4xl font-bold text-teal-900">
          {problem.id}. {problem.title}
        </h1>

        <span className="text-sm uppercase text-gray-700 bg-blue-300 px-3 py-1 rounded-md">
          {problem.difficulty}
        </span>

        <p className="text-lg font-semibold">{problem.description}</p>

        <div>
          <h2 className="font-semibold text-lg">Examples : </h2>

          {problem.examples?.map((ex: any, i: number) => (
            <div
              key={i}
              className="bg-gray-100 text-teal-900 p-4 rounded-lg mt-3 text-sm font-mono"
            >
              <p className="font-semibold mb-2 flex text-xl items-center ">
                <Dot />
                <span>Example {i + 1}:</span>
              </p>

              <div className="p-4 bg-white rounded-lg font-semibold">
                <p>
                  <span className="text-gray-500 text-md font-semibold">
                    Input:
                  </span>{" "}
                  {ex.input}
                </p>

                <p>
                  <span className="text-gray-500 font-semibold">Output:</span>{" "}
                  {ex.output}
                </p>

                {ex.explanation && (
                  <p>
                    <span className="font-semibold text-gray-500">
                      Explanation:
                    </span>{" "}
                    {ex.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-teal-900">Constraints:</p>
          <div className="bg-gray-100 font-semibold text-gray-500 p-3 rounded-xl">
            <ul className="list-disc ml-5 space-y-2">
              {problem.constraints?.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-teal-900">Tags:</p>
          <div className="font-semibold text-gray-500 pl-2 rounded-xl flex gap-4">
            {problem.tags?.map((c: string) => (
              <span className="text-white bg-teal-700 px-2 py-1 rounded-xl ">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <EditorPanel
        id={id}
        runTrigger={runTrigger}
        submitTrigger={submitTrigger}
        sampleTestCases={problem.sampleTestCases}
      />
    </div>
  );
};

export default ProblemDetail;
