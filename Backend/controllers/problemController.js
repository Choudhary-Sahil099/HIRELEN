import { getAllProblemsAggregated } from "../services/problemServices.js";

export const getAllProblems = async (req, res) => {
  try {
    const userId = req.user?.id;

    const problems = await getAllProblemsAggregated(userId);

    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems" });
  }
};