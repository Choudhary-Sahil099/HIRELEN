import express from "express";
import { submitCode } from "../controllers/submissionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/submit", verifyToken, submitCode);
export default router;