import db from "../../config/db.js";

export const createUser = async ({ name, email, password }) => {
  const [result] = await db.execute(
    `INSERT INTO users 
     (name, email, password, provider, is_verified)
     VALUES (?, ?, ?, 'local', false)`,
    [name, email, password]
  );

  return result.insertId;
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

  return {
    id: result.insertId,
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
  const { name, avatar_url, bio } = data;

  await db.execute(
    `UPDATE users 
     SET name = ?, avatar_url = ?, bio = ?
     WHERE id = ?`,
    [name, avatar_url, bio, userId]
  );
};