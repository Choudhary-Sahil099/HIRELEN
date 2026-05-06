import express from "express";

import {
  startInterview,
  fetchNextQuestion,
  submitInterviewAnswer,
  endInterview,
} from "../controllers/interviewController.js";

const router = express.Router();
router.post("/start", startInterview);
router.get("/:sessionId/question", fetchNextQuestion);
router.post("/:sessionId/submit", submitInterviewAnswer);
router.post("/:sessionId/end", endInterview);

export default router;