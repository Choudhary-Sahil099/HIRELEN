import db from "../../config/db.js";

export const markLessonCompleteDB = async (userId, lessonId) => {
  await db.execute(
    `INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
     VALUES (?, ?, true, NOW())
     ON DUPLICATE KEY UPDATE completed = true, completed_at = NOW()`,
    [userId, lessonId]
  );
};

export const getCourseIdFromLesson = async (lessonId) => {
  const [rows] = await db.execute(
    `SELECT c.id AS course_id
     FROM lessons l
     JOIN sections s ON l.section_id = s.id
     JOIN courses c ON s.course_id = c.id
     WHERE l.id = ?`,
    [lessonId]
  );

  return rows[0]?.course_id;
};
export const updateCourseProgressDB = async (userId, courseId) => {
  const [totalRows] = await db.execute(
    `SELECT COUNT(*) AS total
     FROM lessons l
     JOIN sections s ON l.section_id = s.id
     WHERE s.course_id = ?`,
    [courseId]
  );

  const total = totalRows[0].total;

  const [completedRows] = await db.execute(
    `SELECT COUNT(*) AS completed
     FROM lesson_progress lp
     JOIN lessons l ON lp.lesson_id = l.id
     JOIN sections s ON l.section_id = s.id
     WHERE lp.user_id = ? AND lp.completed = true AND s.course_id = ?`,
    [userId, courseId]
  );

  const completed = completedRows[0].completed;

  const percentage = total === 0 ? 0 : (completed / total) * 100;

  await db.execute(
    `INSERT INTO course_progress (user_id, course_id, completed_lessons, total_lessons, progress_percentage)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       completed_lessons = ?,
       total_lessons = ?,
       progress_percentage = ?`,
    [userId, courseId, completed, total, percentage, completed, total, percentage]
  );
};