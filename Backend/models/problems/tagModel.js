import db from "../../config/db.js";

export const createTag = async (name) => {
  const [result] = await db.execute(
    `INSERT INTO tags (name) VALUES (?)`,
    [name]
  );
  return result.insertId;
};

export const getAllTags = async () => {
  const [rows] = await db.execute(`SELECT * FROM tags`);
  return rows;
};