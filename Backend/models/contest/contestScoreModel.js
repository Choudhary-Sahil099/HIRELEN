import db from "../../config/db.js";

export const updateContestScoreDB = async (contestId, userId, points) => {
  await db.execute(`
    INSERT INTO contest_scores (contest_id, user_id, total_score, problems_solved)
    VALUES (?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE 
      total_score = total_score + ?,
      problems_solved = problems_solved + 1
  `, [contestId, userId, points, points]);
};

export const getLeaderboardDB = async (contestId) => {
  const [rows] = await db.execute(`
    SELECT user_id, total_score, problems_solved
    FROM contest_scores
    WHERE contest_id = ?
    ORDER BY total_score DESC
  `, [contestId]);

  return rows;
};