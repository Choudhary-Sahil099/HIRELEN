import db from "../../config/db.js";

export const addEditorial = async (problemId, content) => {
  await db.execute(
    `INSERT INTO editorials (problem_id, content)
     VALUES (?, ?)`,
    [problemId, content]
  );
};

export const getEditorial = async (problemId) => {
  const [rows] = await db.execute(
    `SELECT * FROM editorials WHERE problem_id = ?`,
    [problemId]
  );
  return rows[0];
};