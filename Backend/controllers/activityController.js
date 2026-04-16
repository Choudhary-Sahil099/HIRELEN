import { getUserActivity } from "../services/activityService.js";
import { fillMissingDates, calculateStreaks } from "../utils/activityUtils.js";

export const getUserHeatmap = async (req, res) => {
  try {
    const userId = req.user.id;

    const rawData = await getUserActivity(userId);

    const heatmap = fillMissingDates(rawData);
    const { current, max } = calculateStreaks(heatmap);

    res.json({
      heatmap,
      currentStreak: current,
      maxStreak: max
    });

  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};