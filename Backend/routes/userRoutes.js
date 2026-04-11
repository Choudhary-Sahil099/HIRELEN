import express from "express";
import { getStats } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", verifyToken, getStats);

export default router;