import {
  compileCpp,
  runCpp,
  createExecutionEnvironment,
  cleanupExecutionEnvironment,
} from "./executeCpp.js";
const normalize = (str) =>
  String(str ?? "")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();

const isPalindrome = (s) =>
  s ===
  s.split("").reverse().join("");
const judgeOutput = (
  judgeType,
  output,
  expected
) => {

  const out = normalize(output);

  const exp = normalize(expected);

  switch (judgeType) {
    case "exact":
      return out === exp;
    case "ignore_order":

      return (
        out
          .split(" ")
          .sort()
          .join(" ") ===

        exp
          .split(" ")
          .sort()
          .join(" ")
      );
    case "float": {

      const a = parseFloat(out);

      const b = parseFloat(exp);

      if (
        Number.isNaN(a) ||
        Number.isNaN(b)
      ) {
        return false;
      }

      return (
        Math.abs(a - b) < 1e-6
      );
    }

    case "palindrome_length":

      return (
        isPalindrome(out) &&
        out.length === exp.length
      );
    default:

      return out === exp;
  }
};

export const judgeCpp = async (
  code,
  testCases,
  judgeType = "exact"
) => {

  let totalTime = 0;

  let testcaseResults = [];

  const env =
    createExecutionEnvironment(
      code
    );

  try {
    await compileCpp(
      env.filePath,
      env.outputPath,
      env.workingDir
    );
    for (
      let i = 0;
      i < testCases.length;
      i++
    ) {

      const {
        input,
        output,
        isHidden,
      } = testCases[i];

      const {
        output: result,
        time,
      } = await runCpp(
        env.workingDir,
        input
      );

      totalTime += time;
      const passed = judgeOutput(
        judgeType,
        result,
        output
      );

      testcaseResults.push({

        input: isHidden
          ? null
          : input,

        expected: isHidden
          ? null
          : normalize(output),

        output: isHidden
          ? null
          : normalize(result),

        passed,

        isHidden,
      });
      if (!passed) {
        break;
      }
    }
    const allPassed =
      testcaseResults.every(
        (t) => t.passed
      );

    return {

      verdict: allPassed
        ? "Accepted"
        : "Wrong Answer",

      runtime:
        totalTime.toFixed(2),

      testcases:
        testcaseResults,
    };

  } catch (error) {

    const errMsg = String(error);

    return {

      verdict:
        errMsg.includes("Compilation")
          ? "Compilation Error"

          : errMsg.includes("Time Limit")
          ? "Time Limit Exceeded"

          : "Runtime Error",

      runtime:
        totalTime.toFixed(2),

      testcases:
        testcaseResults,
    };

  } finally {

    cleanupExecutionEnvironment(
      env
    );
  }
};