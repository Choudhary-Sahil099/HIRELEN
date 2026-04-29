import { executeCpp } from "../utils/executeCpp.js";
import { handleSubmission } from "../services/submissionServices.js";

export const runCode = async (req, res) => {
try {
const { code, testcases } = req.body;
if (!code) {
  return res.status(400).json({
    success: false,
    message: "Code is required",
  });
}

if (!testcases || !Array.isArray(testcases) || testcases.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Testcases are required",
  });
}

let results = [];
let totalTime = 0;

for (let i = 0; i < testcases.length; i++) {
  const { input, expected } = testcases[i];

  const { output, time } = await executeCpp(code, input || "");
  totalTime += time;

  const normalizedOutput = (output || "").replace(/\r/g, "").trim();
  const normalizedExpected = String(expected || "")
    .replace(/\r/g, "")
    .trim();

  results.push({
    input,
    output: normalizedOutput,
    expected: normalizedExpected,
    passed: normalizedOutput === normalizedExpected,
  });
}

res.json({
  success: true,
  runtime: totalTime.toFixed(2),
  testcases: results,
});
} catch (error) {
console.error("Run Error:", error);
res.status(500).json({
  success: false,
  message: "Execution failed",
});
}
};

export const submitCode = async (req, res) => {
try {
const { problemId, code, language, contestId } = req.body;
const userId = req.user?.id || 1;
if (!problemId || !code || !language) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields",
  });
}

const result = await handleSubmission({
  userId,
  problemId,
  code,
  language,
  contestId: contestId || null,
});

res.json({
  success: true,
  data: result,
});

} catch (error) {
console.error("Submit Error:", error);
res.status(500).json({
  success: false,
  message: "Submission failed",
});
}
};
