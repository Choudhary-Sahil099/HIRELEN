import { executeCpp } from "../utils/executeCpp.js";
import { handleSubmission } from "../services/submissionServices.js";
import db from "../config/db.js";

export const runCode = async (req, res) => {
  try {
    const { code, testcases, problemId, language } = req.body;

    if (!code || !problemId || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const driverMap = {
      cpp: "driver_code_cpp",
      python: "driver_code_python",
      java: "driver_code_java",
    };

    const driverField = driverMap[language];

    const [rows] = await db.execute(
      `SELECT ${driverField} FROM problems WHERE id = ?`,
      [problemId],
    );

    const driverCode = rows[0]?.[driverField] || "";

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
