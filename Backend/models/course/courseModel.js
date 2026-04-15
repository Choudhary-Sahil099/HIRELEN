import db from "../../config/db.js";

export const getCourseFullDetails = async (courseId, userId) => {
  const [rows] = await db.execute(
    `SELECT 
      c.id AS course_id,
      c.title AS course_title,
      c.description,

      cp.progress_percentage,

      s.id AS section_id,
      s.title AS section_title,
      s.order_index AS section_order,

      l.id AS lesson_id,
      l.title AS lesson_title,
      l.type,
      l.content_url,
      l.order_index AS lesson_order,

      lp.completed AS is_completed

    FROM courses c
    LEFT JOIN sections s ON c.id = s.course_id
    LEFT JOIN lessons l ON s.id = l.section_id

    LEFT JOIN course_progress cp 
      ON cp.course_id = c.id AND cp.user_id = ?

    LEFT JOIN lesson_progress lp 
      ON lp.lesson_id = l.id AND lp.user_id = ?

    WHERE c.id = ?
    ORDER BY s.order_index, l.order_index`,
    [userId, userId, courseId]
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