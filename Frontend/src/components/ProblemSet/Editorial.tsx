import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { Fullscreen } from "lucide-react";

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
  const [selectedCase, setSelectedCase] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorRef, setEditorRef] = useState<any>(null);
  useEffect(() => {
    if (runTrigger > 0) handleRun();
  }, [runTrigger]);

  useEffect(() => {
    if (submitTrigger > 0) handleSubmit();
  }, [submitTrigger]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = isFullscreen ? "hidden" : "auto";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const saved = localStorage.getItem(`code-${id}`);
    if (saved) setCode(saved);
  }, [id]);

  useEffect(() => {
    if (result?.error && editorRef) {
      const line = extractErrorLine(result.error);

      if (line) {
        editorRef.deltaDecorations(
          [],
          [
            {
              range: {
                startLineNumber: line,
                endLineNumber: line,
                startColumn: 1,
                endColumn: 1,
              },
              options: {
                isWholeLine: true,
                className: "bg-red-200",
              },
            },
          ],
        );

        editorRef.revealLineInCenter(line);
      }
    }
  }, [result, editorRef]);
  const handleSubmit = async () => {
    try {
      if (!id) return;
      setLoading(true);
      setResult(null);
      setMode("submit");
      setActiveTab("result");
      setSelectedCase(0);

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
      setSelectedCase(0);

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
          testcases: sampleTestCases.map((tc: any) => ({
            input: tc.input,
            expected: tc.output,
          })),
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
  const extractErrorLine = (error: string) => {
    const match = error.match(/:(\d+):\d+/);
    return match ? Number(match[1]) : null;
  };

  return (
    <div className="w-260 flex flex-col gap-2 inter relative">
      <div
        className={`${
          isFullscreen ? "bg-gray-200 fixed inset-0 z-50" : "bg-gray-200"
        }`}
      >
        {" "}
        <div className="flex justify-between items-center px-4 py-2 bg-[#DDE1E3]">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-teal-900 font-semibold px-3 py-1 rounded"
          >
            {" "}
            <option value="cpp">C++</option>{" "}
            <option value="python">Python</option>{" "}
            <option value="java">Java</option>{" "}
          </select>
          <Fullscreen
            stroke="gray"
            size={20}
            className="cursor-pointer"
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
        <Editor
          height={isFullscreen ? "100%" : "410px"}
          language={language}
          theme="vs-light"
          value={code}
          onChange={(value) => {
            const newCode = value || "";
            setCode(newCode);
            localStorage.setItem(`code-${id}`, newCode);
          }}
          onMount={(editor) => setEditorRef(editor)}
        />
      </div>

      <div className="h-58 bg-white rounded-lg overflow-y-auto no-scrollbar">
        <div className="flex bg-[#DDE1E3] p-1 gap-2 sticky top-0">
          <button
            onClick={() => setActiveTab("testcase")}
            className={`px-4 py-2 ${
              activeTab === "testcase"
                ? "border-b-2 border-teal-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Testcase
          </button>

          <button
            onClick={() => setActiveTab("result")}
            className={`px-4 py-2 ${
              activeTab === "result"
                ? "border-b-2 border-teal-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Result
          </button>
        </div>

        {activeTab === "result" && result && (
          <div className="p-4 text-sm">
            {result.error && (
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {" "}
                {result.error}{" "}
              </pre>
            )}

            {mode === "submit" && result.status && (
              <>
                <div className="flex justify-between mb-3">
                  <span
                    className={`font-semibold ${
                      result.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.status.toUpperCase()}
                  </span>

                  <span className="text-gray-500">
                    {Number(result.runtime).toFixed(0)} ms
                  </span>
                </div>

                <div className="flex gap-2 mb-4">
                  {result.testcases?.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCase(i)}
                      className={`px-3 py-1 rounded ${
                        selectedCase === i
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                {result.testcases?.[selectedCase] && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-500">Input</p>
                      <div className="bg-gray-200 p-3 rounded">
                        {result.testcases[selectedCase].input}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">Output</p>
                      <div
                        className={`p-3 rounded ${
                          result.testcases[selectedCase].passed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {result.testcases[selectedCase].output}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">Expected</p>
                      <div className="bg-gray-200 p-3 rounded">
                        {result.testcases[selectedCase].expected}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {(mode === "run" || mode === "submit") && result?.testcases && (
              <>
                {" "}
                <div className="flex justify-between mb-3">
                  <span
                    className={`font-semibold ${
                      mode === "submit"
                        ? result.status === "accepted"
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {mode === "submit"
                      ? result.status.toUpperCase()
                      : "RUN RESULT"}{" "}
                  </span>
                  <span className="text-gray-500">
                    {Number(result.runtime).toFixed(0)} ms
                  </span>
                </div>
                <div className="flex gap-2 mb-4">
                  {result.testcases.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCase(i)}
                      className={`px-3 py-1 rounded ${
                        selectedCase === i
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>
                {result.testcases[selectedCase] && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-500">Input</p>
                      <div className="bg-gray-200 p-3 rounded">
                        {result.testcases[selectedCase].input}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">Output</p>
                      <div
                        className={`p-3 rounded ${
                          result.testcases[selectedCase].passed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {result.testcases[selectedCase].output}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">Expected</p>
                      <div className="bg-gray-200 p-3 rounded">
                        {result.testcases[selectedCase].expected}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "testcase" && (
          <div className="p-4">
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {sampleTestCases?.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedCase(i)}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${
                    selectedCase === i
                      ? "bg-gray-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  Case {i + 1}
                </button>
              ))}
            </div>
            {sampleTestCases?.[selectedCase] && (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Input</p>
                  <div className="bg-gray-200 p-3 rounded font-mono text-sm">
                    {sampleTestCases[selectedCase].input}
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Expected</p>
                  <div className="bg-gray-200 p-3 rounded font-mono text-sm">
                    {sampleTestCases[selectedCase].output}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
