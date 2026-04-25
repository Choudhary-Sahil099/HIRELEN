import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

const EditorPanel = ({ id, runTrigger, submitTrigger }: any) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"run" | "submit" | null>(null);
  const [activeTab, setActiveTab] = useState("testcase");
  const [customInput, setCustomInput] = useState("");

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
    <div className="w-2/3 flex flex-col gap-4">
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white text-sm">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 px-3 py-1 rounded"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <Editor
          height="500px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleRun}
          className="bg-gray-300 px-4 py-2 rounded font-semibold"
        >
          {loading && mode === "run" ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={handleSubmit}
          className="bg-teal-900 text-white px-4 py-2 rounded font-semibold"
        >
          {loading && mode === "submit" ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div className="bg-white rounded-xl">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("testcase")}
            className={`px-4 py-2 ${
              activeTab === "testcase"
                ? "border-b-2 border-teal-600 font-semibold"
                : ""
            }`}
          >
            Testcase
          </button>

          <button
            onClick={() => setActiveTab("result")}
            className={`px-4 py-2 ${
              activeTab === "result"
                ? "border-b-2 border-teal-600 font-semibold"
                : ""
            }`}
          >
            Result
          </button>
        </div>

        <div className="p-4">

          {/* TESTCASE */}
          {activeTab === "testcase" && (
            <div>
              <p className="font-semibold mb-2">Custom Input:</p>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full h-24 border rounded p-2"
                placeholder="Enter input..."
              />
            </div>
          )}

          {/* RESULT */}
          {activeTab === "result" && result && (
            <div>

              {result.error && (
                <p className="text-red-600 font-semibold">
                  {result.error}
                </p>
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