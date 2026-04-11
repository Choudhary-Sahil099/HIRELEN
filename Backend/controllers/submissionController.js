import { handleSubmission } from "../services/submissionServices.js";
export const submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const userId = req.user.id;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const result = await handleSubmission({
      userId,
      problemId,
      code,
      language,
    });

    res.json({
      message: "Submission processed",
      ...result,
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};