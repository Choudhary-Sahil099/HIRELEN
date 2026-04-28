import fs from "fs";
import path from "path";
import { compileCpp, runCpp } from "./executeCpp.js";

const dir = path.join(process.cwd(), "temp");

export const judgeCpp = async (code, testCases) => {
  const fileName = `code_${Date.now()}.cpp`;
  const filePath = path.join(dir, fileName);
  const outputPath = filePath.replace(".cpp", "");
  let totalTime = 0;

  fs.writeFileSync(filePath, code);

  try {
    await compileCpp(filePath, outputPath);

    for (let i = 0; i < testCases.length; i++) {
      const { input, output, isHidden } = testCases[i];

      console.log(`Running test case ${i + 1}:`, input);

      const { output: result, time } = await runCpp(outputPath, input);
      totalTime += time;
      const normalizedResult = result.replace(/\r/g, "").trim();
      const normalizedExpected = String(output).replace(/\r/g, "").trim();

      console.log("RAW RESULT:", JSON.stringify(result));
      console.log("NORMALIZED RESULT:", normalizedResult);
      console.log("EXPECTED:", normalizedExpected);

      if (normalizedResult !== normalizedExpected) {
        return {
          verdict: "Wrong Answer",
  failedCase: i + 1,
  isHidden,
  expected: isHidden ? null : normalizedExpected,
  got: isHidden ? null : normalizedResult,
  runtime: totalTime.toFixed(2),
        };
      }
    }

    return {
      verdict: "Accepted",
      runtime: totalTime.toFixed(2)
    };
  } catch (error) {
    console.error("Judge Error:", error);

    const errMsg = String(error);

    return {
      verdict: errMsg.includes("Compilation")
        ? "Compilation Error"
        : errMsg.includes("Time Limit")
          ? "Time Limit Exceeded"
          : "Runtime Error",
    };
  } finally {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupErr) {
      console.error("Cleanup error:", cleanupErr);
    }
  }
};
