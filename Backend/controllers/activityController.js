import { getUserActivity } from "../services/activityService.js";
import { fillMissingDates, calculateStreaks } from "../utils/activityUtils.js";

export const getUserHeatmap = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const rawData = await getUserActivity(userId);

    const heatmap = fillMissingDates(rawData);
    const { current, max } = calculateStreaks(heatmap);

    res.json({
      success: true,
      data: {
        heatmap,
        currentStreak: current,
        maxStreak: max,
      },
    });

  } catch (error) {
    console.error("Heatmap Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
