import Editor from "@monaco-editor/react";
import { ChevronDown } from "lucide-react";

const CodeEditor = () => {
  return (
    <div className="flex flex-col gap-4 px-8 py-5 w-full inter">
      <div className="flex flex-col gap-3 sticky top-0 bg-[#f8fafc] z-10 pb-3">
        <h1 className="text-3xl font-semibold text-[#004650]">
          1. Median of Two Sorted Arrays
        </h1>

        <p className="text-base font-semibold text-teal-900 bg-gray-100 p-4 rounded-lg max-h-32 overflow-y-auto">
          Given two sorted arrays nums1 and nums2 of size m and n respectively,
          return the median of the two sorted arrays. The overall run time
          complexity should be O(log (m+n)).
        </p>
        <div className="h-10">

        </div>
      </div>

      <div className="flex justify-end gap-5 items-center text-sm">
        <div className="relative w-fit">
          <select className="appearance-none bg-gray-200 text-teal-900 font-semibold px-3 py-2 pr-8 rounded outline-none cursor-pointer">
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown size={14} stroke="#004650" />
          </div>
        </div>

        <button className="bg-[#004650] text-white py-2 px-4 rounded-lg hover:cursor-pointer">
          Submit Code
        </button>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden p-4">
        <Editor
          height="410px"
          defaultLanguage="cpp"
          theme="vs-light"
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