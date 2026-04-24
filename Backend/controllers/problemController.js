import { getAllProblemsAggregated } from "../services/problemServices.js";
import { getProblemDetailsService } from "../services/problemServices.js";
export const getAllProblems = async (req, res) => {
  try {
    const userId = req.user?.id;

    const problems = await getAllProblemsAggregated(userId);

    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems" });
  }
};
export const getProblemDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await getProblemDetailsService(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (err) {
    console.error("Error fetching problem details:", err);
    res.status(500).json({ message: "Server error" });
  }
};
