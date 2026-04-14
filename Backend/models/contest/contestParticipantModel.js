import db from "../../config/db.js";

export const joinContest = async (userId, contestId) => {
  await db.execute(
    `INSERT IGNORE INTO contest_participants (contest_id, user_id)
     VALUES (?, ?)`,
    [contestId, userId]
  );
};

export const isUserInContest = async (userId, contestId) => {
  const [rows] = await db.execute(
    `SELECT * FROM contest_participants WHERE user_id = ? AND contest_id = ?`,
    [userId, contestId]
  );
  return rows.length > 0;
};