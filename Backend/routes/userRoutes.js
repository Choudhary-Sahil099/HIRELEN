import express from "express";
import { getStats,getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";
import { upload } from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.get("/stats", verifyToken, getStats);
router.get("/me", verifyToken, getProfile);
router.put("/update", verifyToken, upload.single("avatar"), updateProfile);
export default router;
