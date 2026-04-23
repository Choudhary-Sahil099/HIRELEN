import db from "../../config/db.js";
export const createUserStats = async (userId) => {
  await db.execute(`INSERT INTO user_stats (user_id) VALUES (?)`, [userId]);
};
export const getUserStats = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM user_stats WHERE user_id = ?`,
    [userId],
  );

  return rows[0];
};
export const incrementSubmissions = async (userId) => {
  try {
    console.log("USER ID:", userId);

    await db.execute(
      `UPDATE user_stats 
   SET total_submissions = total_submissions + 1
   WHERE user_id = ?`,
      [userId],
    );

    console.log("user_stats inserted/updated ✅");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
};
export const incrementAccepted = async (userId) => {
  await db.execute(
    `UPDATE user_stats 
     SET accepted_submissions = accepted_submissions + 1
     WHERE user_id = ?`,
    [userId],
  );
};
export const updateSolvedStats = async (userId, difficulty) => {
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

  await db.execute(query, [userId]);
};
export const updateStreak = async (userId) => {
  const [rows] = await db.execute(
    `SELECT DISTINCT date 
FROM user_activity 
WHERE user_id = ?
ORDER BY date DESC 
LIMIT 2`,
    [userId],
  );

  if (rows.length === 0) return;

  let newStreak = 1;

  if (rows.length === 2) {
    const [diffRows] = await db.execute(`SELECT DATEDIFF(?, ?) AS diff`, [
      rows[0].date,
      rows[1].date,
    ]);

    const diff = diffRows[0].diff;

    if (diff === 1) {
      const [statsRows] = await db.execute(
        `SELECT current_streak, max_streak 
         FROM user_stats 
         WHERE user_id = ?`,
        [userId],
      );

      newStreak = statsRows[0].current_streak + 1;

      const newMax = Math.max(statsRows[0].max_streak, newStreak);

      await db.execute(
        `UPDATE user_stats 
   SET current_streak = ?, 
       max_streak = ?, 
       last_solved_date = CURDATE()
   WHERE user_id = ?`,
        [newStreak, newMax, userId],
      );

      return;
    }
  }
  await db.execute(
    `UPDATE user_stats 
   SET current_streak = 1,
       max_streak = GREATEST(max_streak, 1),
       last_solved_date = CURDATE()
   WHERE user_id = ?`,
    [userId],
  );
};
