import { getNextQuestion, startInterviewSession  } from "../services/interviewServices.js"

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
