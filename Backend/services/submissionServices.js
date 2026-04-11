import {
  createSubmission,
  updateSubmissionStatus,
  hasUserSolvedProblem,
} from "../models/submission/subModel.js";

import {
  incrementSubmissions,
  incrementAccepted,
  updateSolvedStats,
  updateStreak,
} from "../models/user/userStatsModel.js";

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
}) => {
  try {
    const alreadySolved = await hasUserSolvedProblem(
      userId,
      problemId
    );
    const submissionId = await createSubmission({
      userId,
      problemId,
      code,
      language,
    });
    await incrementSubmissions(userId);
    const result = await runJudge(code, language);
    await updateSubmissionStatus({
      submissionId,
      status: result.status,
      runtime: result.runtime,
      memory: result.memory,
    });
    if (result.status !== "accepted") {
      return {
        submissionId,
        status: result.status,
      };
    }
    await incrementAccepted(userId);
    if (!alreadySolved) {
      const [rows] = await db.execute(
        `SELECT difficulty FROM problems WHERE id = ?`,
        [problemId]
      );

      const difficulty = rows[0]?.difficulty;
      await updateSolvedStats(userId, difficulty);
      await updateStreak(userId);
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