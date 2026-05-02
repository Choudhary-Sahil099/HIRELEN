import { getNextQuestion, startInterviewSession  } from "../services/interviewServices.js"
import { generateInterviewReport } from "../services/interviewServices.js";

export const startInterview = async (req, res) => {
  try {
    const userId = req.user?.id || 1;

    const session = await startInterviewSession(userId);

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to start interview" });
  }
};
export const fetchNextQuestion = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const question = await getNextQuestion(sessionId);

    res.json(question);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch question" });
  }
};
export const endInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;
    await db.execute(
      `UPDATE interview_sessions 
       SET status = 'COMPLETED', ended_at = NOW()
       WHERE id = ?`,
      [sessionId]
    );

    const report = await generateInterviewReport(sessionId);

    res.json({
      message: "Interview completed",
      report
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to end interview" });
  }
};