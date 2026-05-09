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

    console.log(
      "NEXT STATE:",
      nextState
    );

    let activeQuestion = null;

    if (
      nextState === "QUESTION_INTRO"
    ) {

      console.log(
        "LOADING EXISTING QUESTION..."
      );

      if (
        !session.current_question_id
      ) {

        throw new Error(
          "No active question assigned to session"
        );
      }


      const [rows] =
        await db.execute(
          `
          SELECT
            iq.id AS interview_question_id,

            iq.question_type,
            iq.question_order,

            iq.coding_problem_id,

            p.id AS problem_id,
            p.title,
            p.description,
            p.difficulty

          FROM interview_questions iq

          LEFT JOIN problems p
          ON iq.coding_problem_id = p.id

          WHERE iq.id = ?
          `,
          [
            session.current_question_id,
          ]
        );

      const questionData =
        rows[0];

      if (!questionData) {

        throw new Error(
          "Current question not found"
        );
      }
      if (
        questionData?.problem_id
      ) {

        const [exampleRows] =
          await db.execute(
            `
            SELECT *
            FROM problem_examples
            WHERE problem_id = ?
            ORDER BY order_index ASC
            `,
            [
              questionData.problem_id,
            ]
          );

        questionData.examples =
          exampleRows;
      }

      activeQuestion = {

        completed: false,

        type:
          questionData.question_type,

        data: questionData,
      };
    }

    await updateInterviewState({

      sessionId,

      nextState,
    });

    console.log(
      "ACTIVE QUESTION:",
      JSON.stringify(
        activeQuestion,
        null,
        2
      )
    );

    const aiResult =
      await generateInterviewerResponse({

        sessionId,

        userMessage,

        previousState:
          session.current_state,

        forcedState:
          nextState,

        question:
          activeQuestion,
      });

    return {

      success: true,

      currentState:
        session.current_state,

      nextState,

      aiReply:
        aiResult.reply,

      evaluation,

      question:
        activeQuestion || null,
    };

  } catch (err) {

    console.error(
      "Interview Orchestrator Error:",
      err
    );

    throw err;
  }
};