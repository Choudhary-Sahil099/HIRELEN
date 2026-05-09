import db from "../config/db.js";
import axios from "axios";

import buildIntroPrompt from "../ai/prompts/introPrompt.js";
import buildQuestionPrompt from "../ai/prompts/questionPrompt.js";
import buildApproachPrompt from "../ai/prompts/approachPrompt.js";
import buildReviewPrompt from "../ai/prompts/reviewPrompt.js";
import buildFollowupPrompt from "../ai/prompts/followupPrompt.js";
import buildSetupPrompt from "../ai/prompts/setupPrompt.js";
import buildQuestionIntroPrompt from "../ai/prompts/questionIntroPrompt.js";
export const generateInterviewerResponse = async ({
  sessionId,
  userMessage,
  previousState,
  forcedState,
  question,
}) => {
  try {
    const [sessionRows] = await db.execute(
      `SELECT *
       FROM interview_sessions
       WHERE id = ?`,
      [sessionId],
    );

    const session = sessionRows[0];

    if (!session) {
      throw new Error("Session not found");
    }
    const [memoryRows] = await db.execute(
      `SELECT *
       FROM interview_memory
       WHERE session_id = ?`,
      [sessionId],
    );

    const memory = memoryRows[0];

    let prompt = "";

    switch (forcedState || session.current_state) {
      case "INTRO":
        prompt = buildIntroPrompt({
          userMessage,

          memory,
        });

        break;

      case "SETUP":
        prompt = buildSetupPrompt({
          userMessage,

          memory,

          previousState,
        });

        break;

      case "QUESTION_INTRO":
        prompt = buildQuestionIntroPrompt({
          question,
        });

        break;

      case "APPROACH_DISCUSSION":
        prompt = buildApproachPrompt({
          userMessage,

          memory,
        });

        break;

      case "CODE_REVIEW":
        prompt = buildReviewPrompt({
          userMessage,

          memory,
        });

        break;

      case "FOLLOW_UP":
        prompt = buildFollowupPrompt({
          userMessage,

          memory,
        });

        break;

      default:
        prompt = `
You are a professional technical interviewer.
Reply professionally.
`;
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",

      {
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.1,
      },

      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      },
    );

    const aiReply = response.data.choices[0].message.content;

    const updatedHistory = `
${memory?.discussion_history || ""}

Candidate:
${userMessage}

AI:
${aiReply}
`;

    await db.execute(
      `UPDATE interview_memory
       SET discussion_history = ?
       WHERE session_id = ?`,
      [updatedHistory, sessionId],
    );
    return {
      state: session.current_state,
      reply: aiReply,
    };
  } catch (err) {
    console.error("AI Interview Service Error:", err);

    throw err;
  }
};
