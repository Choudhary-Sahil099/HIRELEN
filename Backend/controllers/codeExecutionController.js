import { executeCpp } from "../utils/executeCpp.js";
import { handleSubmission } from "../services/submissionServices.js";
import db from "../config/db.js";
const normalize = (str) =>
  String(str ?? "")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();
const judgeOutput = (judgeType, output, expected) => {
  const out = normalize(output);
  const exp = normalize(expected);

  switch (judgeType) {
    case "float":
      return Math.abs(parseFloat(out) - parseFloat(exp)) < 1e-6;

    case "ignore_order":
      return (
        out.split(" ").sort().join(" ") ===
        exp.split(" ").sort().join(" ")
      );

    case "palindrome_length":
      return (
        out === out.split("").reverse().join("") &&
        out.length === exp.length
      );

    default:
      return out === exp;
  }
};
export const runCode = async (req, res) => {
  try {
    const { code, testcases, problemId, language } = req.body;

    if (!code || !problemId || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!Array.isArray(testcases) || testcases.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid testcases",
      });
    }

    if (language !== "cpp") {
      return res.status(400).json({
        success: false,
        message: "Only C++ supported in run mode",
      });
    }

    const driverMap = {
      cpp: "driver_code_cpp",
      python: "driver_code_python",
      java: "driver_code_java",
    };

    const driverField = driverMap[language];
    const [rows] = await db.execute(
      `SELECT ${driverField}, judge_type FROM problems WHERE id = ?`,
      [problemId]
    );

    const driverCode = rows[0]?.[driverField] || "";
    const judgeType = rows[0]?.judge_type || "exact";

    const fullCode = [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "",
      "struct ListNode {",
      "    int val;",
      "    ListNode* next;",
      "    ListNode(int x) : val(x), next(NULL) {}",
      "};",
      "",
      "struct TreeNode {",
      "    int val;",
      "    TreeNode* left;",
      "    TreeNode* right;",
      "    TreeNode(int x) : val(x), left(NULL), right(NULL) {}",
      "};",
      "",
      code.trim(),
      "",
      driverCode.trim(),
    ].join("\n");

    let results = [];
    let totalTime = 0;

    for (let i = 0; i < testcases.length; i++) {
      const { input, expected } = testcases[i];

      const { output, time } = await executeCpp(fullCode, input || "");
      totalTime += time;

      const passed = judgeOutput(judgeType, output, expected);

      results.push({
        input,
        output: normalize(output),
        expected: normalize(expected),
        passed,
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