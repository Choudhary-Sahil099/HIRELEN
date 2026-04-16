import {
  markLessonCompleteDB,
  getCourseIdFromLesson,
  updateCourseProgressDB,
} from "../models/course/progressModel.js";
import { updateUserActivity } from "../services/activityService.js";
import { updateStreak } from "../models/user/userStatsModel.js";

export const markLessonComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    await markLessonCompleteDB(userId, lessonId);

    const courseId = await getCourseIdFromLesson(lessonId);

    await updateCourseProgressDB(userId, courseId);
    await updateUserActivity(userId);
    await updateStreak(userId);

    res.json({ message: "Lesson completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};