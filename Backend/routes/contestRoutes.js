import express from "express";
import { verifyToken} from "../middleware/authMiddleware.js";

import {
  createContest,
  joinContest,
  getLeaderboardController,
  finalizeContest
} from "../controllers/contestController.js";

const router = express.Router();

router.post("/", verifyToken, createContest);
router.post("/:id/join", verifyToken, joinContest);
router.get("/:id/leaderboard", getLeaderboardController);
router.post("/:id/finalize", verifyToken, finalizeContest);

export default router;