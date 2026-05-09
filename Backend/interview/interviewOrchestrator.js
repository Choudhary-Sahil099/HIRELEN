import db from "../config/db.js";

import {
  generateInterviewerResponse,
} from "../services/AiInterviewServices.js";

import {
  evaluateCandidate,
} from "./evaluationEngine.js";

import {
  getNextState,
} from "./transitionManager.js";

import {
  updateInterviewState,
} from "./stateUpdater.js";

export const runInterviewCycle = async ({
  sessionId,
  userMessage,
  code,
  reviewResult,
  question,
}) => {

  try {

    const [sessionRows] =
      await db.execute(
        `
        SELECT *
        FROM interview_sessions
        WHERE id = ?
        `,
        [sessionId]
      );

    const session =
      sessionRows[0];

    if (!session) {

      throw new Error(
        "Session not found"
      );
    }

    const evaluation =
      evaluateCandidate({

        currentState:
          session.current_state,

        userMessage,

        code,

        reviewResult,
      });

    const nextState =
      getNextState({

        currentState:
          session.current_state,

        session,

        evaluation,
      });
    await updateInterviewState({

      sessionId,

      nextState,
    });
    const aiResult =
      await generateInterviewerResponse({

        sessionId,

        userMessage,

        previousState:
          session.current_state,

        forcedState:
          nextState,
        question,
      });


    return {

      success: true,

      currentState:
        session.current_state,

      nextState,

      aiReply:
        aiResult.reply,

      evaluation,
    };

  } catch (err) {

    console.error(
      "Interview Orchestrator Error:",
      err
    );

    throw err;
  }
};