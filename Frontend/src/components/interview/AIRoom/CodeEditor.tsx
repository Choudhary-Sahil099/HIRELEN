import Editor from "@monaco-editor/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
type Props = {
  question: any;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
  fetchQuestion: () => Promise<void>;
};

const CodeEditor = ({
  question,
  code,
  setCode,
  sessionId,
  fetchQuestion,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const handleSubmit = async () => {

    try {

      setSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/interview/${sessionId}/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            code,
            language,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      alert(`Verdict: ${data.result}`);
      await fetchQuestion();

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 px-8 py-5 w-full inter">
      <div className="flex flex-col gap-3 bg-[#f8fafc] z-10 pb-3">
        <h1 className="text-3xl font-semibold text-[#004650]">
          {question?.data?.title || "Loading..."}
        </h1>

        <p className="text-base font-semibold text-teal-900 bg-gray-100 p-4 rounded-lg max-h-32 overflow-y-auto">
          {question?.data?.description || "Fetching question..."}
        </p>
        {question?.data?.examples?.length > 0 && (
          <div className="flex gap-4">
            {question.data.examples.map((example: any, index: number) => (
              <div
                key={example.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm w-120"
              >
                <h2 className="text-lg font-semibold text-[#004650] mb-1">
                  Example {index + 1}
                </h2>

                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Input:</span>

                  <pre className="bg-gray-100 p-3 rounded-lg mt-1 text-sm overflow-x-auto">
                    {example.input}
                  </pre>
                </div>

                <div className="mb-3">
                  <span className="font-semibold text-gray-700">Output:</span>

                  <pre className="bg-gray-100 p-3 rounded-lg mt-1 text-sm overflow-x-auto">
                    {example.output}
                  </pre>
                </div>

                {example.explanation && (
                  <div className="">
                    <span className="font-semibold text-gray-700">
                      Explanation:
                    </span>

                    <p className="bg-gray-50 p-3 rounded-lg mt-1 text-sm">
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-5 items-center text-sm">
        <div className="relative w-fit">
          <select className="appearance-none bg-gray-200 text-teal-900 font-semibold px-3 py-2 pr-8 rounded outline-none cursor-pointer" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown size={14} stroke="#004650" />
          </div>
        </div>

        <button className="bg-[#004650] text-white py-2 px-4 rounded-lg hover:cursor-pointer" onClick={handleSubmit}
          disabled={submitting}>
          {submitting
            ? "Submitting..."
            : "Submit Code"}
        </button>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden p-4">
        <Editor
          height="410px"
          defaultLanguage="cpp"
          theme="vs-light"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
