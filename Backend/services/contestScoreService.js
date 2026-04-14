import db from "../config/db.js";
import { updateContestScoreDB, getLeaderboardDB } from "../models/contest/contestScoreModel.js";

export const updateContestScore = async (userId, contestId, problemId) => {
  console.log("Updating contest score...");

  problemId = Number(problemId);
  const [problem] = await db.execute(
    `SELECT points FROM contest_problems 
     WHERE contest_id = ? AND problem_id = ?`,
    [contestId, problemId]
  );

  if (!problem.length) {
    console.log("Problem not in contest");
    return;
  }

  const points = problem[0].points;
  const [rows] = await db.execute(
    `SELECT * FROM contest_scores 
     WHERE user_id = ? AND contest_id = ?`,
    [userId, contestId]
  );
  if (rows.length === 0) {
    await db.execute(
      `INSERT INTO contest_scores 
       (contest_id, user_id, total_score, problems_solved, solved_problems)
       VALUES (?, ?, ?, 1, ?)`,
      [contestId, userId, points, JSON.stringify([problemId])]
    );

    return;
  }

  const scoreRow = rows[0];

  let solvedProblems = [];

  try {
    solvedProblems = JSON.parse(scoreRow.solved_problems || "[]");
  } catch {
    solvedProblems = [];
  }

  console.log("Solved problems:", solvedProblems);

  if (solvedProblems.includes(problemId)) {
    console.log("Already counted problem");
    return;
  }
  solvedProblems.push(problemId);

  await db.execute(
    `UPDATE contest_scores
     SET total_score = total_score + ?,
         problems_solved = problems_solved + 1,
         solved_problems = ?
     WHERE user_id = ? AND contest_id = ?`,
    [points, JSON.stringify(solvedProblems), userId, contestId]
  );
};
export const getLeaderboard = async (contestId) => {
  const rows = await getLeaderboardDB(contestId);

  return rows.map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};