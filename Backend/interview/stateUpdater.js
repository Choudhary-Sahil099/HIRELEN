import db from "../config/db.js";

export const updateInterviewState = async ({
  sessionId,
  nextState,
  currentQuestionIndex,
  currentQuestionId,
}) => {

  try {

    const updates = [];
    const values = [];

    if (nextState) {
      updates.push(
        "current_state = ?"
      );

      values.push(nextState);
    }

    if (
      currentQuestionIndex !== undefined
    ) {
      updates.push(
        "current_question_index = ?"
      );

      values.push(
        currentQuestionIndex
      );
    }

    if (
      currentQuestionId !== undefined
    ) {
      updates.push(
        "current_question_id = ?"
      );

      values.push(
        currentQuestionId
      );
    }
    updates.push(
      "phase_started_at = NOW()"
    );
    values.push(sessionId);

    const query = `
      UPDATE interview_sessions
      SET ${updates.join(", ")}
      WHERE id = ?
    `;

    await db.execute(query, values);

    return {
      success: true,
      nextState,
    };

  } catch (err) {

    console.error(
      "State Update Error:",
      err
    );

    throw err;
  }
};