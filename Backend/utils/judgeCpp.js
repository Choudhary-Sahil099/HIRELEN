import fs from "fs";
import path from "path";
import { compileCpp, runCpp } from "./executeCpp.js";

const dir = path.join(process.cwd(), "temp");

export const judgeCpp = async (code, testCases) => {
const fileName = `code_${Date.now()}.cpp`;
const filePath = path.join(dir, fileName);
const outputPath = filePath.replace(".cpp", "");

let totalTime = 0;
let testcaseResults = [];

fs.writeFileSync(filePath, code);

try {
await compileCpp(filePath, outputPath);

for (let i = 0; i < testCases.length; i++) {
  const { input, output, isHidden } = testCases[i];

  const { output: result, time } = await runCpp(outputPath, input);
  totalTime += time;

  const normalizedResult = result.replace(/\r/g, "").trim();
  const normalizedExpected = String(output).replace(/\r/g, "").trim();

  const passed = normalizedResult === normalizedExpected;

  testcaseResults.push({
    input,
    expected: isHidden ? null : normalizedExpected,
    output: isHidden ? null : normalizedResult,
    passed,
  });

  if (!passed) break;
}

const allPassed = testcaseResults.every((t) => t.passed);

return {
  verdict: allPassed ? "Accepted" : "Wrong Answer",
  runtime: totalTime.toFixed(2),
  testcases: testcaseResults,
};

} catch (error) {
const errMsg = String(error);
return {
  verdict: errMsg.includes("Compilation")
    ? "Compilation Error"
    : errMsg.includes("Time Limit")
    ? "Time Limit Exceeded"
    : "Runtime Error",
  runtime: totalTime.toFixed(2),
  testcases: testcaseResults,
};

} finally {
try {
if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
} catch {}
}
};
