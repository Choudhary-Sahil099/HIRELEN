import { getUserStats } from "../models/user/userStatsModel.js";

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await getUserStats(userId);

    res.json(stats);
  } catch (error) {
    console.error("GET STATS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message, 
    });
  }
};