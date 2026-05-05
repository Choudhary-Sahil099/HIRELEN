import db from "../../config/db.js";
export const createUserStats = async (userId) => {
  await db.execute(
    `INSERT IGNORE INTO user_stats (user_id) VALUES (?)`,
    [userId]
  );
};
export const getUserStats = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM user_stats WHERE user_id = ?`,
    [userId]
  );

  return rows[0] || null;
};

export const incrementSubmissions = async (userId, connection) => {
  await connection.execute(
    `UPDATE user_stats 
     SET total_submissions = total_submissions + 1
     WHERE user_id = ?`,
    [userId]
  );
};

export const incrementAccepted = async (userId, connection) => {
  await connection.execute(
    `UPDATE user_stats 
     SET accepted_submissions = accepted_submissions + 1
     WHERE user_id = ?`,
    [userId]
  );
};

export const updateSolvedStats = async (userId, difficulty, connection) => {
  let query = `
    UPDATE user_stats 
    SET total_solved = total_solved + 1
  `;

  if (difficulty === "easy") {
    query += `, easy_count = easy_count + 1 `;
  } else if (difficulty === "medium") {
    query += `, medium_count = medium_count + 1 `;
  } else {
    query += `, hard_count = hard_count + 1 `;
  }

  query += `WHERE user_id = ?`;

  await connection.execute(query, [userId]);
};

export const updateStreak = async (userId, executor) => {
  const [statsRows] = await executor.execute(
    `SELECT current_streak, max_streak, last_solved_date 
     FROM user_stats 
     WHERE user_id = ?`,
    [userId]
  );

  if (!statsRows.length) return;

  const stats = statsRows[0];
  const today = new Date().toISOString().slice(0, 10);
  if (!stats.last_solved_date) {
    await executor.execute(
      `UPDATE user_stats 
       SET current_streak = 1,
           max_streak = 1,
           last_solved_date = CURDATE()
       WHERE user_id = ?`,
      [userId]
    );
    return;
  }
  if (stats.last_solved_date === today) {
    return;
  }

  const [diffRows] = await executor.execute(
    `SELECT DATEDIFF(?, ?) AS diff`,
    [today, stats.last_solved_date]
  );

  const diff = diffRows[0].diff;

  let newStreak = 1;

  if (diff === 1) {
    newStreak = (stats.current_streak || 0) + 1;
  }

  const newMax = Math.max(stats.max_streak || 0, newStreak);

  await executor.execute(
    `UPDATE user_stats 
     SET current_streak = ?, 
         max_streak = ?, 
         last_solved_date = CURDATE()
     WHERE user_id = ?`,
    [newStreak, newMax, userId]
  );
};