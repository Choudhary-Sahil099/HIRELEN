import db from "../../config/db.js";

export const getCourseFullDetails = async (courseId) => {
  const [rows] = await db.execute(
    `SELECT 
      c.id AS course_id,
      c.title AS course_title,
      c.description,

      s.id AS section_id,
      s.title AS section_title,
      s.order_index AS section_order,

      l.id AS lesson_id,
      l.title AS lesson_title,
      l.type,
      l.content_url,
      l.order_index AS lesson_order

    FROM courses c
    LEFT JOIN sections s ON c.id = s.course_id
    LEFT JOIN lessons l ON s.id = l.section_id

    WHERE c.id = ?
    ORDER BY s.order_index, l.order_index`,
    [courseId]
  );

  return rows;
};
export const enrollUserInCourse = async (userId, courseId) => {
  await db.execute(
    `INSERT INTO enrollments (user_id, course_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE enrolled_at = CURRENT_TIMESTAMP`,
    [userId, courseId]
  );
};