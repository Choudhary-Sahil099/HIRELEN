import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { Fullscreen, EllipsisVertical } from "lucide-react";
const EditorPanel = ({
  id,
  runTrigger,
  submitTrigger,
  sampleTestCases,
}: any) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"run" | "submit" | null>(null);
  const [activeTab, setActiveTab] = useState("testcase");
  const [customInput, setCustomInput] = useState("");
  const [selectedCase, setSelectedCase] = useState(0);

  useEffect(() => {
    if (runTrigger > 0) handleRun();
  }, [runTrigger]);

  useEffect(() => {
    if (submitTrigger > 0) handleSubmit();
  }, [submitTrigger]);

  const handleSubmit = async () => {
    try {
      if (!id) return;

      setLoading(true);
      setResult(null);
      setMode("submit");
      setActiveTab("result");

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
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.message });
        return;
      }

      setResult(data.data);
    } catch {
      setResult({ error: "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      setResult(null);
      setMode("run");
      setActiveTab("result");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/code/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          language,
          input: customInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.message });
        return;
      }

      setResult(data);
    } catch {
      setResult({ error: "Execution failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-300 flex flex-col gap-2 inter">
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-[#DDE1E3] border-none text-md">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-teal-900 font-semibold px-3 py-1 rounded outline-none"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <div className="flex justify-center items-center gap-3">
            <Fullscreen stroke="gray" size={20} />
            <EllipsisVertical stroke="gray" size={20} fill="gray" />
          </div>
        </div>
        <div className="w-full h-3 bg-white"></div>
        <Editor
          height="410px"
          language={language}
          theme="vs-light"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>
      <div className="bg- rounded-lg h-55 overflow-y-auto no-scrollbar">
        <div className="flex bg-[#DDE1E3] rounded-t-lg p-1  gap-2 sticky top-0 z-10">
          <button
            onClick={() => setActiveTab("testcase")}
            className={`px-4 py-2 text-teal-900 ${
              activeTab === "testcase"
                ? "border-b-3 border-teal-600 font-semibold text-teal-900"
                : "text-gray-500"
            }`}
          >
            Testcase
          </button>

          <button
            onClick={() => setActiveTab("result")}
            className={`px-4 py-2 ${
              activeTab === "result"
                ? "border-b-3 border-teal-600 font-semibold text-teal-900"
                : "text-gray-500"
            }`}
          >
            Result
          </button>
        </div>

        <div>
          {activeTab === "testcase" && (
            <div className="bg-white text-white p-4">
              <div className="flex gap-3 mb-4">
                {sampleTestCases?.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCase(i)}
                    className={`px-4 py-1 rounded-lg text-sm ${
                      selectedCase === i
                        ? "bg-gray-500 text-white"
                        : "bg-transparent text-gray-400"
                    }`}
                  >
                    Case {i + 1}
                  </button>
                ))}
                <button className="text-gray-400 text-lg">+</button>
              </div>
              {sampleTestCases?.[selectedCase] && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-teal-900 font-semibold text-sm">Input = </p>
                    <div className="bg-gray-300 font-semibold p-3 rounded-md text-gray-800">
                      {sampleTestCases[selectedCase].input}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-teal-900 text-sm font-semibold ">Expected Output =</p>
                    <div className="bg-gray-300 text-gray-800 font-semibold p-3 rounded-lg">
                      {sampleTestCases[selectedCase].output}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "result" && result && (
            <div>
              {result.error && (
                <p className="text-red-600 font-semibold">{result.error}</p>
              )}

              {mode === "submit" && result.status && (
                <p>
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
              )}

              {result.output && (
                <pre className="bg-black text-green-400 p-3 rounded mt-2">
                  {result.output}
                </pre>
              )}

              {result.stderr && (
                <pre className="bg-black text-red-400 p-3 rounded mt-2">
                  {result.stderr}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
