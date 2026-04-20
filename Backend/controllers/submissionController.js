import { handleSubmission } from "../services/submissionServices.js";

export const submitCode = async (req, res) => {
  try {
    const { problemId, code, language, contestId } = req.body;
    const userId = req.user.id;

    console.log(`[SUBMISSION] User ${userId} → Problem ${problemId}`);
    if (!problemId || typeof problemId !== "number") {
      return res.status(400).json({ success: false, message: "Invalid problemId" });
    }

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: "Code cannot be empty" });
    }

    if (!["cpp"].includes(language)) {
      return res.status(400).json({ success: false, message: "Unsupported language" });
    }
    const result = await handleSubmission({
      userId,
      problemId,
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