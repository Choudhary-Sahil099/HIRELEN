import db from "../../config/db.js";

export const createContest = async ({ title, description, startTime, endTime, createdBy }) => {
  const [result] = await db.execute(
    `INSERT INTO contests (title, description, start_time, end_time, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, startTime, endTime, createdBy]
  );
  return result.insertId;
};

export const getContestById = async (contestId) => {
  const [rows] = await db.execute(
    `SELECT * FROM contests WHERE id = ?`,
    [contestId]
  );
  return rows[0];
};