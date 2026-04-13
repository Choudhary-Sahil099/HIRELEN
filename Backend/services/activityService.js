import db from "../config/db.js";

export const updateUserActivity = async (userId) => {
  const today = new Date().toISOString().slice(0, 10);

  await db.execute(`
    INSERT INTO user_activity (user_id, date, submission_count)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE submission_count = submission_count + 1
  `, [userId, today]);
};

export const getUserActivity = async (userId) => {
  const [rows] = await db.execute(`
    SELECT date, submission_count as count
    FROM user_activity
    WHERE user_id = ?
      AND date >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
    ORDER BY date ASC
  `, [userId]);

  return rows;
};