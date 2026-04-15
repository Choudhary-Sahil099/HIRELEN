import express from "express";
import { getCourseById, enrollInCourse} from "../controllers/courseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:courseId",verifyToken, getCourseById);
router.post("/:courseId/enroll", verifyToken, enrollInCourse);
export default router;