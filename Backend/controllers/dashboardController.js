import { getDashboardData } from "../services/dashboardServices.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await getDashboardData(userId);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};