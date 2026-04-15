import express from "express";
import { markLessonComplete } from "../controllers/progressController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/lessons/:lessonId/complete", verifyToken, markLessonComplete);

export default router;