import db from "../../config/db.js";

export const addProblemsToContest = async (contestId, problems) => {
  for (const p of problems) {
    await db.execute(
      `INSERT INTO contest_problems (contest_id, problem_id, points, order_index)
       VALUES (?, ?, ?, ?)`,
      [contestId, p.problemId, p.points, p.order]
    );
  }
};

export const getContestProblems = async (contestId) => {
  const [rows] = await db.execute(
    `SELECT * FROM contest_problems WHERE contest_id = ?`,
    [contestId]
  );
  return rows;
};