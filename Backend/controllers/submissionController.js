import { handleSubmission } from "../services/submissionServices.js";
import { getUserSubmissions } from "../models/submission/subModel.js";


export const submitCode = async (req, res) => {
  try {
    const { problemId, code, language, contestId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const parsedProblemId = Number(problemId);

    if (!parsedProblemId || isNaN(parsedProblemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid problemId",
      });
    }

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Code cannot be empty",
      });
    }

    const allowedLanguages = ["cpp"];

    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    const result = await handleSubmission({
      userId,
      problemId: parsedProblemId,
      code,
      language,
      contestId: contestId || null,
    });

    res.json({
      success: true,
      message: "Submission processed",
      data: result,
    });

  } catch (error) {
    console.error("Submit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    let submissions = await getUserSubmissions(userId, limit);

    if (status) {
      submissions = submissions.filter((s) => s.status === status);
    }

    const formatted = submissions.map((s) => ({
      id: s.id,
      problem: s.title,
      slug: s.slug,
      status: s.status,
      language: s.language,
      runtime: s.runtime,
      memory: s.memory,
      created_at: s.created_at,
    }));

    res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });

  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
    });
  }
};