import { getCourseFullDetails , enrollUserInCourse } from "../models/course/courseModel.js";

export const getCourseById = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { courseId } = req.params;

    const rows = await getCourseFullDetails(courseId, userId);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = {
      id: rows[0].course_id,
      title: rows[0].course_title,
      description: rows[0].description,
      progress: rows[0].progress_percentage || 0,
      sections: [],
    };

    const sectionMap = new Map();

    let prevCompleted = true;
let currentSectionId = null;

rows.forEach((row) => {
  if (!row.section_id) return;
  if (currentSectionId !== row.section_id) {
    currentSectionId = row.section_id;
    prevCompleted = true;
  }

  if (!sectionMap.has(row.section_id)) {
    const section = {
      id: row.section_id,
      title: row.section_title,
      lessons: [],
    };

    sectionMap.set(row.section_id, section);
    course.sections.push(section);
  }

  if (row.lesson_id) {
    const isCompleted = !!row.is_completed;

    const lesson = {
      id: row.lesson_id,
      title: row.lesson_title,
      type: row.type,
      content_url: row.content_url,
      completed: isCompleted,
      unlocked: prevCompleted,
    };

    sectionMap.get(row.section_id).lessons.push(lesson);

    prevCompleted = isCompleted;
  }
});

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("USER ID:", req.user.id);
    const { courseId } = req.params;
    await enrollUserInCourse(userId, courseId);

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};