import db from "../../config/db.js";

export const getConstraintsByProblem = async (problemId) => {
  const [rows] = await db.execute(
    `SELECT constraint_text FROM problem_constraints WHERE problem_id = ?`,
    [problemId]
  );

  return rows;
};