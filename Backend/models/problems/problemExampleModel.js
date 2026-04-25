import db from "../../config/db.js";

export const getExamplesByProblem = async (problemId) => {
  const [rows] = await db.execute(
    `SELECT * FROM problem_examples WHERE problem_id = ?`,
    [problemId]
  );

  return rows;
};