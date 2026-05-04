import db from "../config/db.js";
import { judgeCpp } from "../utils/judgeCpp.js";

import {
  createSubmission,
  updateSubmissionStatus,
} from "../models/submission/subModel.js";

import {
  incrementSubmissions,
  incrementAccepted,
  updateSolvedStats,
  updateStreak,
} from "../models/user/userStatsModel.js";

import { updateStats } from "../models/problems/problemStatementModel.js";
import { updateUserActivity } from "./activityService.js";
import { validateContest } from "./contestService.js";
import { updateContestScore } from "./contestScoreService.js";

export const handleSubmission = async ({
  userId,
  problemId,
  code,
  language,
  contestId = null,
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    if (contestId) {
      await validateContest(contestId);
    }

    const submissionId = await createSubmission({
      userId,
      problemId,
      code,
      language,
      contestId,
      status: "pending",
      connection,
    });

    const driverMap = {
      cpp: "driver_code_cpp",
      python: "driver_code_python",
      java: "driver_code_java",
    };

    const driverField = driverMap[language];

    if (!driverField) {
      throw new Error("Unsupported language");
    }

    const [problemRows] = await connection.execute(
      `SELECT ${driverField} FROM problems WHERE id = ?`,
      [problemId]
    );

    if (!problemRows.length) {
      throw new Error("Problem not found");
    }

    const driverCode = problemRows[0][driverField] || "";

    let fullCode = "";

    if (language === "cpp") {
      fullCode = `
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

${code}

${driverCode}
`;
    } else if (language === "python") {
      fullCode = `
${code}
${driverCode}
`;
    } else {
      throw new Error("Language not implemented yet");
    }
    const [rows] = await connection.execute(
      `SELECT input, output, is_hidden 
       FROM test_cases 
       WHERE problem_id = ?`,
      [problemId]
    );

    if (!rows.length) {
      throw new Error("No test cases found");
    }

    const testCases = rows.map((tc) => ({
      input: tc.input != null ? String(tc.input) : "",
      output: tc.output != null ? String(tc.output) : "",
      isHidden: tc.is_hidden === 1,
    }));

    let judgeResult;

    if (language === "cpp") {
      judgeResult = await judgeCpp(fullCode, testCases);
    } else {
      throw new Error("Language execution not implemented");
    }
    const statusMap = {
      Accepted: "accepted",
      "Wrong Answer": "wrong",
      "Time Limit Exceeded": "tle",
      "Runtime Error": "runtime_error",
      "Compilation Error": "compilation_error",
    };

    const status = statusMap[judgeResult.verdict] || "runtime_error";

    await updateSubmissionStatus({
      submissionId,
      status,
      runtime: judgeResult.runtime || null,
      memory: null,
      connection,
    });

    const isAccepted = status === "accepted";

    await updateStats(problemId, isAccepted, connection);
    await incrementSubmissions(userId, connection);
    const allPassed = judgeResult.testcases.every((tc) => tc.passed);

    let visibleTestcases;

    if (allPassed) {
      visibleTestcases = judgeResult.testcases.filter((tc) => !tc.isHidden);
    } else {
      const failed = judgeResult.testcases.find((tc) => !tc.passed);
      visibleTestcases = failed ? [failed] : [];
    }
    if (!isAccepted) {
      await updateUserActivity(userId, connection);
      await connection.commit();

      return {
        submissionId,
        status,
        runtime: judgeResult.runtime,
        testcases: visibleTestcases,
      };
    }
    await incrementAccepted(userId, connection);

    const [acceptedRows] = await connection.execute(
      `SELECT id FROM submissions
       WHERE user_id = ? AND problem_id = ? AND status = 'accepted'`,
      [userId, problemId]
    );

    if (acceptedRows.length === 1) {
      const [rows] = await connection.execute(
        `SELECT difficulty FROM problems WHERE id = ?`,
        [problemId]
      );

      const difficulty = rows[0]?.difficulty;
      await updateSolvedStats(userId, difficulty, connection);
    }

    await updateStreak(userId, connection);

    if (contestId) {
      await updateContestScore(userId, contestId, problemId, connection);
    }

    await updateUserActivity(userId, connection);

    await connection.commit();

    return {
      submissionId,
      status,
      runtime: judgeResult.runtime,
      testcases: visibleTestcases,
      passed: judgeResult.testcases.length,
      total: judgeResult.testcases.length,
    };

  } catch (error) {
    await connection.rollback();
    console.error("Submission Error:", error);
    throw error;
  } finally {
    connection.release();
  }
};