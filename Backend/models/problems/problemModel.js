import db from "../../config/db.js";

export const createProblem = async (data) => {
  const {
    title,
    slug,
    description,
    difficulty,
    constraints,
  } = data;

  const [result] = await db.execute(
    `INSERT INTO problems 
     (title, slug, description, difficulty, constraints)
     VALUES (?, ?, ?, ?, ?)`,
    [title, slug, description, difficulty, constraints]
  );

  return result.insertId;
};

export const getProblemBySlug = async (slug) => {
  const [rows] = await db.execute(
    `SELECT * FROM problems WHERE slug = ?`,
    [slug]
  );
  return rows[0];
};

export const getAllProblems = async () => {
  const [rows] = await db.execute(`SELECT * FROM problems`);
  return rows;
};
export const getProblemById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM problems WHERE id = ?`,
    [id]
  );

  return rows[0];
};