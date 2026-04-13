import express from "express";
import { getUserHeatmap } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/heatmap", verifyToken, getUserHeatmap);

export default router;