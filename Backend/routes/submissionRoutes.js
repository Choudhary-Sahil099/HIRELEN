import express from "express";
import {
  submitCode,
  getUserSubmissionHistory
} from "../controllers/submissionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/submit", verifyToken, submitCode);
router.get("/user", verifyToken, getUserSubmissionHistory);

export default router;