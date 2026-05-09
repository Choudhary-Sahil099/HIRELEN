import express from "express";

import {
  respondToCandidate,
} from "../controllers/aiInterviewController.js";

const router = express.Router();

router.post(
  "/respond",
  respondToCandidate
);

export default router;