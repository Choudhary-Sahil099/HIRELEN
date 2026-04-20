import express from "express";
import { runCode,submitCode } from "../controllers/codeExecutionController.js";

const router = express.Router();

router.post("/run", runCode);
router.post("/submit", submitCode);
export default router;