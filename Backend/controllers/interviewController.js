import db from "../config/db.js";

import {
  getNextQuestion,
  startInterviewSession,
  generateInterviewReport,
  submitAnswer,
} from "../services/interviewServices.js";

export const startInterview = async (req, res) => {
  try {
    const userId = req.user?.id || 1;

    const { domain, type, totalQuestions, difficulty, timeLimit } = req.body;

    const session = await startInterviewSession(
      userId,
      domain,
      type,
      totalQuestions,
      difficulty,
      timeLimit,
    );

    res.json(session);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to start interview",
    });
  }
};

export const fetchNextQuestion = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const question = await getNextQuestion(sessionId);
    console.log("next Ques fetched");
    res.json(question);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch question",
    });
  }
};

export const submitInterviewAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const userId = req.user?.id || 1;

    const { code, language } = req.body;

    const result = await submitAnswer({
      sessionId,
      userId,
      code,
      language,
    });

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Submission failed",
    });
  }
};

export const endInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;

    await db.execute(
      `UPDATE interview_sessions 
       SET status = 'COMPLETED', ended_at = NOW()
       WHERE id = ?`,
      [sessionId],
    );

    const report = await generateInterviewReport(sessionId);

    res.json({
      message: "Interview completed",
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to end interview",
    });
  }
};
