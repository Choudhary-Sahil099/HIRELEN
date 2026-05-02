import express from "express";
import { fetchNextQuestion, startInterview } from "../controllers/interviewController.js";

const router = express.Router();
router.post("/start", startInterview);
router.get("/:sessionId/question", fetchNextQuestion);

export default router;