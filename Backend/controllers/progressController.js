import {
  markLessonCompleteDB,
  getCourseIdFromLesson,
  updateCourseProgressDB,
} from "../models/course/progressModel.js";

export const markLessonComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    await markLessonCompleteDB(userId, lessonId);

    const courseId = await getCourseIdFromLesson(lessonId);

    await updateCourseProgressDB(userId, courseId);

    res.json({ message: "Lesson completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};