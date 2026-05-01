import express from "express";
import {
  getAllProblems,
  getProblemDetails,
  searchProblems
} from "../controllers/problemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllProblems);
router.get("/search", verifyToken, searchProblems);
router.get("/:id", verifyToken, getProblemDetails);
export default router;