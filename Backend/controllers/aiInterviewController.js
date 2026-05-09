import {
  runInterviewCycle,
} from "../interview/interviewOrchestrator.js";

export const respondToCandidate =
  async (req, res) => {

    try {

      const {
        sessionId,
        message,
        code,
        reviewResult,
      } = req.body;

      if (!sessionId) {
        return res.status(400).json({
          error: "Session ID required",
        });
      }

      const result =
        await runInterviewCycle({

          sessionId,

          userMessage: message,

          code,

          reviewResult,
        });

      return res.status(200).json(
        result
      );

    } catch (err) {

      console.error(
        "Interview Response Error:",
        err
      );

      return res.status(500).json({

        error:
          "Failed to process interview response",

        details: err.message,
      });
    }
  };