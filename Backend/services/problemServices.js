import db from "../config/db.js";
import {
  getAllProblems,
  getProblemById,
} from "../models/problems/problemModel.js";
import { getTagsByProblem } from "../models/problems/problemTagModel.js";
import { getUserSubmissions } from "../models/submission/subModel.js";
import { getSampleTestCases } from "../models/problems/testCaseModel.js";
import { getExamplesByProblem } from "../models/problems/problemExampleModel.js";
import { getConstraintsByProblem } from "../models/problems/problemConstraintModel.js";
export const getAllProblemsAggregated = async (userId) => {
  try {
    const problems = await getAllProblems();

    if (!problems.length) return [];
    const [tagRows] = await db.execute(`
      SELECT pt.problem_id, t.name
      FROM problem_tags pt
      JOIN tags t ON pt.tag_id = t.id
    `);

    const tagsMap = {};

    tagRows.forEach((row) => {
      if (!tagsMap[row.problem_id]) {
        tagsMap[row.problem_id] = [];
      }
      tagsMap[row.problem_id].push(row.name);
    });

    const [statsRows] = await db.execute(`
      SELECT problem_id, acceptance_rate
      FROM problem_stats
    `);

    const statsMap = {};
    statsRows.forEach((s) => {
      statsMap[s.problem_id] = `${Number(s.acceptance_rate || 0).toFixed(1)}%`;
    });
    let statusMap = {};

    if (userId) {
      const submissions = await getUserSubmissions(userId);

      submissions.forEach((s) => {
        const status = s.status.toLowerCase();

        if (status === "accepted") {
          statusMap[s.problem_id] = "solved";
        } else if (!statusMap[s.problem_id]) {
          statusMap[s.problem_id] = "attempted";
        }
      });
    }

    const result = problems.map((p) => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      acceptance: statsMap[p.id] || "0%",
      tags: tagsMap[p.id] || [],
      status: statusMap[p.id] || "none",
    }));

    return result;
  } catch (err) {
    console.error("Aggregation Error:", err);
    throw err;
  }
};
export const getProblemDetailsService = async (problemId) => {
  const problem = await getProblemById(problemId);
  if (!problem) return null;

  const tags = await getTagsByProblem(problemId);
  const testCases = await getSampleTestCases(problemId);
  const examples = await getExamplesByProblem(problemId);
  const constraints = await getConstraintsByProblem(problemId);
  return {
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    description: problem.description,
    starter_code_cpp: problem.starter_code_cpp,
    constraints: constraints.map((c) => c.constraint_text),

    tags: tags.map((t) => t.name),

    sampleTestCases: testCases.map((tc) => ({
      input: tc.input,
      output: tc.output,
    })),
    examples: examples.map((e) => ({
      input: e.input,
      output: e.output,
      explanation: e.explanation,
      image_url: e.image_url
    })),
  };
};
