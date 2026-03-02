import express from "express";
import { submitInterview } from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/submit", submitInterview);

export default router;