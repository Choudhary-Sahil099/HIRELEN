import express from "express";
import { createProblemFull } from "../controllers/problemController.js";

const router = express.Router();

router.post("/create", createProblemFull);

export default router;