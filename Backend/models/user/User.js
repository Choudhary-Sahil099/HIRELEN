import db from "../../config/db.js";

export const createUser = async ({ name, email, password }) => {
  const [result] = await db.execute(
    `INSERT INTO users 
     (name, email, password, provider, is_verified)
     VALUES (?, ?, ?, 'local', false)`,
    [name, email, password]
  );

  const userId = result.insertId;
  await db.execute(
    `INSERT INTO user_stats (user_id) VALUES (?)`,
    [userId]
  );

  return userId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const findOrCreateGoogleUser = async ({
  name,
  email,
  googleId,
  avatar,
}) => {
  const [existing] = await db.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (existing.length > 0) return existing[0];

  const [result] = await db.execute(
    `INSERT INTO users 
     (name, email, provider, provider_id, avatar_url, is_verified)
     VALUES (?, ?, 'google', ?, ?, true)`,
    [name, email, googleId, avatar]
  );

  const userId = result.insertId;

  await db.execute(
    `INSERT INTO user_stats (user_id) VALUES (?)`,
    [userId]
  );

  return {
    id: userId,
    name,
    email,
  };
};

export const saveOTP = async (userId, otp, expiry) => {
  await db.execute(
    `UPDATE users 
     SET otp = ?, otp_expiry = ? 
     WHERE id = ?`,
    [otp, expiry, userId]
  );
};

export const verifyOTP = async (userId, otp) => {
  const [rows] = await db.execute(
    `SELECT otp, otp_expiry FROM users WHERE id = ?`,
    [userId]
  );

  const user = rows[0];
  if (!user) return false;

  const isValid =
    user.otp === otp && new Date(user.otp_expiry) > new Date();

  if (!isValid) return false;

  await db.execute(
    `UPDATE users 
     SET is_verified = true, otp = NULL, otp_expiry = NULL 
     WHERE id = ?`,
    [userId]
  );

  return true;
};

export const updateUser = async (userId, data) => {
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.avatar_url !== undefined) {
    fields.push("avatar_url = ?");
    values.push(data.avatar_url);
  }

  if (data.bio !== undefined) {
    fields.push("bio = ?");
    values.push(data.bio);
  }

  if (fields.length === 0) return;

  values.push(userId);

  await db.execute(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
};

export const getUserProfile = async (userId) => {
  const [userRows] = await db.execute(
    `SELECT name, bio, avatar_url 
     FROM users WHERE id = ?`,
    [userId]
  );

  const [statsRows] = await db.execute(
    `SELECT rating, total_solved 
     FROM user_stats WHERE user_id = ?`,
    [userId]
  );

  const user = userRows[0];
  const stats = statsRows[0];

  const rating = stats?.rating || 800;

  let title = "Beginner";
  if (rating >= 2500) title = "Grandmaster";
  else if (rating >= 2000) title = "Master";
  else if (rating >= 1500) title = "Expert";

  return {
    name: user?.name || "User",
    bio: user?.bio || "",
    avatar_url: user?.avatar_url || "",
    rating,
    total_solved: stats?.total_solved || 0,
    title,
  };
};