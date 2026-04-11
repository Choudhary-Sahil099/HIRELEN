import db from "../../config/db.js";

export const createProblemStats = async (problemId) => {
  await db.execute(
    `INSERT INTO problem_stats (problem_id)
     VALUES (?)`,
    [problemId]
  );
};

export const updateStats = async (problemId, isAccepted) => {
  await db.execute(
    `UPDATE problem_stats
     SET total_submissions = total_submissions + 1,
         total_accepted = total_accepted + ?,
         acceptance_rate = 
           (total_accepted / total_submissions) * 100
     WHERE problem_id = ?`,
    [isAccepted ? 1 : 0, problemId]
  );
};