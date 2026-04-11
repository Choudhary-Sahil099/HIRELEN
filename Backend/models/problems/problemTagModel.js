import db from "../../config/db.js";

export const addTagsToProblem = async (problemId, tagIds) => {
  const values = tagIds.map(tagId => [problemId, tagId]);

  await db.query(
    `INSERT INTO problem_tags (problem_id, tag_id) VALUES ?`,
    [values]
  );
};

export const getTagsByProblem = async (problemId) => {
  const [rows] = await db.execute(
    `SELECT t.* FROM tags t
     JOIN problem_tags pt ON t.id = pt.tag_id
     WHERE pt.problem_id = ?`,
    [problemId]
  );
  return rows;
};