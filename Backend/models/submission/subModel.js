import db from "../../config/db.js";
export const createSubmission = async ({
  userId,
  problemId,
  code,
  language,
  contestId = null,
}) => {
  console.log("DB inserting contestId:", contestId);

  const [result] = await db.execute(
    `INSERT INTO submissions 
     (user_id, problem_id, code, language, status, contest_id)
     VALUES (?, ?, ?, ?, 'pending', ?)`,
    [userId, problemId, code, language, contestId] 
  );

  return result.insertId;
};

export const updateSubmissionStatus = async ({
  submissionId,
  status,
  runtime = null,
  memory = null,
}) => {
  await db.execute(
    `UPDATE submissions
     SET status = ?, runtime = ?, memory = ?
     WHERE id = ?`,
    [status, runtime, memory, submissionId]
  );
};

export const getSubmissionById = async (submissionId) => {
  const [rows] = await db.execute(
    `SELECT * FROM submissions WHERE id = ?`,
    [submissionId]
  );

  return rows[0];
};

export const getUserSubmissions = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM submissions 
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

export const getUserProblemSubmissions = async (userId, problemId) => {
  const [rows] = await db.execute(
    `SELECT * FROM submissions
     WHERE user_id = ? AND problem_id = ?
     ORDER BY created_at DESC`,
    [userId, problemId]
  );

  return rows;
};
export const hasUserSolvedProblem = async (userId, problemId) => {
  const [rows] = await db.execute(
    `SELECT id FROM submissions
     WHERE user_id = ? 
     AND problem_id = ? 
     AND status = 'accepted'
     LIMIT 1`,
    [userId, problemId]
  );

  return rows.length > 0;
};
export const getRecentSubmissions = async (userId, limit = 10) => {
  const [rows] = await db.execute(
    `SELECT s.*, p.title, p.slug
     FROM submissions s
     JOIN problems p ON s.problem_id = p.id
     WHERE s.user_id = ?
     ORDER BY s.created_at DESC
     LIMIT ?`,
    [userId, limit]
  );

  return rows;
};