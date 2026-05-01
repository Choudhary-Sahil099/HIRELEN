import db from "../config/db.js";
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

export const searchProblems = async (req, res) => {
try {
const { q } = req.query;

if (!q || !q.trim()) {
  return res.json({
    success: true,
    data: [],
  });
}

const [rows] = await db.execute(
  `SELECT id, title, difficulty 
   FROM problems 
   WHERE title LIKE ? 
   LIMIT 10`,
  [`%${q}%`]
);

res.json({
  success: true,
  data: rows,
});

} catch (error) {
console.error("Search Error:", error);

res.status(500).json({
  success: false,
  message: "Search failed",
});

}
};
