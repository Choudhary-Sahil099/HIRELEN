import express from "express";
import { getAllProblems } from "../controllers/problemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllProblems);

export default router;