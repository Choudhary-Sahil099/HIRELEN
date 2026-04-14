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
import db from "../config/db.js";
const runJudge = async (code, language) => {
  const isAccepted = true;

  return {
    status: isAccepted ? "accepted" : "wrong",
    runtime: Math.random() * 100,
    memory: Math.random() * 50,
  };
};

export const handleSubmission = async ({
  userId,
  problemId,
  code,
  language,
  contestId = null,
}) => {
  try {
    if (contestId) {
      await validateContest(contestId);
    }

    const submissionId = await createSubmission({
      userId,
      problemId,
      code,
      language,
      contestId,
    });

    await updateUserActivity(userId);
    await incrementSubmissions(userId);

    const result = await runJudge(code, language);

    await updateSubmissionStatus({
      submissionId,
      status: result.status,
      runtime: result.runtime,
      memory: result.memory,
    });

    const isAccepted = result.status === "accepted";

    await updateStats(problemId, isAccepted);

    console.log("Result status:", result.status);

    if (!isAccepted) {
      return {
        submissionId,
        status: result.status,
      };
    }
    await incrementAccepted(userId);

    const [acceptedRows] = await db.execute(
      `SELECT id FROM submissions
       WHERE user_id = ? AND problem_id = ? AND status = 'accepted'`,
      [userId, problemId]
    );
    if (acceptedRows.length === 1) {
      const [rows] = await db.execute(
        `SELECT difficulty FROM problems WHERE id = ?`,
        [problemId]
      );

      const difficulty = rows[0]?.difficulty;

      console.log("Updating solved stats:", difficulty);

      await updateSolvedStats(userId, difficulty);
      await updateStreak(userId);
    }
    if (contestId) {
      await updateContestScore(userId, contestId, problemId);
    }

    return {
      submissionId,
      status: result.status,
    };

  } catch (error) {
    console.error("Submission Error:", error);
    throw error;
  }
};