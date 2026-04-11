import db from "../../config/db.js";
export const createUserStats = async (userId) => {
  await db.execute(
    `INSERT INTO user_stats (user_id) VALUES (?)`,
    [userId]
  );
};
export const getUserStats = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM user_stats WHERE user_id = ?`,
    [userId]
  );

  return rows[0];
};
export const incrementSubmissions = async (userId) => {
  await db.execute(
    `UPDATE user_stats 
     SET total_submissions = total_submissions + 1
     WHERE user_id = ?`,
    [userId]
  );
};
export const incrementAccepted = async (userId) => {
  await db.execute(
    `UPDATE user_stats 
     SET accepted_submissions = accepted_submissions + 1
     WHERE user_id = ?`,
    [userId]
  );
};
export const updateSolvedStats = async (userId, difficulty) => {
  let query = `
    UPDATE user_stats 
    SET total_solved = total_solved + 1,
  `;

  if (difficulty === "easy") {
    query += `easy_count = easy_count + 1 `;
  } else if (difficulty === "medium") {
    query += `medium_count = medium_count + 1 `;
  } else {
    query += `hard_count = hard_count + 1 `;
  }

  query += `WHERE user_id = ?`;

  await db.execute(query, [userId]);
};
export const updateStreak = async (userId) => {
  const [rows] = await db.execute(
    `SELECT current_streak, max_streak, last_solved_date 
     FROM user_stats WHERE user_id = ?`,
    [userId]
  );

  const stats = rows[0];
  const today = new Date();
  const lastDate = stats.last_solved_date
    ? new Date(stats.last_solved_date)
    : null;

  let newStreak = 1;

  if (lastDate) {
    const diff =
      (today - lastDate) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      newStreak = stats.current_streak + 1;
    } else if (diff === 0) {
      newStreak = stats.current_streak;
    }
  }

  const newMax = Math.max(stats.max_streak, newStreak);

  await db.execute(
    `UPDATE user_stats
     SET current_streak = ?, max_streak = ?, last_solved_date = CURDATE()
     WHERE user_id = ?`,
    [newStreak, newMax, userId]
  );
};