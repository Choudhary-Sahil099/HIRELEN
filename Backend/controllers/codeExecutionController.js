import { executeCpp } from "../utils/executeCpp.js";
import { handleSubmission } from "../services/submissionServices.js";

export const runCode = async (req, res) => {
  try {
    const { code, input } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const { output, time } = await executeCpp(code, input || "");

    res.json({
      success: true,
      output,
      time: time?.toFixed(2),
    });
  } catch (error) {
    console.error("Run Error:", error);

    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const submitCode = async (req, res) => {
  try {
    const { problemId, code, language, contestId } = req.body;
    const userId = req.user?.id || 1;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
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
      data: result,
    });
  } catch (error) {
    console.error("Submit Error:", error);

    res.status(500).json({
      success: false,
      message: "Submission failed",
    });
  }
};
