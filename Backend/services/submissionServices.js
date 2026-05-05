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
    await connection.execute(
      `INSERT INTO user_stats (user_id)
       VALUES (?)
       ON DUPLICATE KEY UPDATE user_id = user_id`,
      [userId]
    );

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
    if (!driverField) throw new Error("Unsupported language");

    const [problemRows] = await connection.execute(
      `SELECT ${driverField}, judge_type FROM problems WHERE id = ?`,
      [problemId]
    );

    if (!problemRows.length) throw new Error("Problem not found");

    const driverCode = problemRows[0][driverField] || "";
    const judgeType = problemRows[0].judge_type || "exact";

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

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

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

    if (!rows.length) throw new Error("No test cases found");

    const testCases = rows.map((tc) => ({
      input: String(tc.input ?? ""),
      output: String(tc.output ?? ""),
      isHidden: tc.is_hidden === 1,
    }));

    const judgeResult = await judgeCpp(fullCode, testCases, judgeType);

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
      await connection.commit();
      await updateUserActivity(userId, db);

      return {
        submissionId,
        status,
        runtime: judgeResult.runtime,
        testcases: visibleTestcases,
      };
    }
    await incrementAccepted(userId, connection);

    const [existingAccepted] = await connection.execute(
      `SELECT 1 FROM submissions
       WHERE user_id = ?
       AND problem_id = ?
       AND status = 'accepted'
       AND id != ?
       LIMIT 1`,
      [userId, problemId, submissionId]
    );

    if (existingAccepted.length === 0) {
      const [rows] = await connection.execute(
        `SELECT difficulty FROM problems WHERE id = ?`,
        [problemId]
      );

      const difficulty = rows[0]?.difficulty;
      await updateSolvedStats(userId, difficulty, connection);
    }

    if (contestId) {
      await updateContestScore(userId, contestId, problemId, connection);
    }
    await connection.commit();
    await updateStreak(userId, db);
    await updateUserActivity(userId, db);

    return {
      submissionId,
      status,
      runtime: judgeResult.runtime,
      testcases: visibleTestcases,
      passed: judgeResult.testcases.filter((t) => t.passed).length,
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