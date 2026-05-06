import db from "../config/db.js";
import { handleSubmission } from "./submissionServices.js";

export const getNextQuestion = async (sessionId) => {
  try {
    const [sessionRows] = await db.execute(
      "SELECT * FROM interview_sessions WHERE id = ?",
      [sessionId]
    );

    const session = sessionRows[0];

    if (!session) {
      throw new Error("Session not found");
    }
    if (
      session.current_question_index >=
      session.total_questions
    ) {
      return {
        completed: true,
        message: "Interview complete",
      };
    }
    const [askedRows] = await db.execute(
      `SELECT coding_problem_id, non_coding_question_id
       FROM interview_questions
       WHERE session_id = ?`,
      [sessionId]
    );

    const askedCodingIds = askedRows
      .map((q) => q.coding_problem_id)
      .filter(Boolean);

    const askedNonCodingIds = askedRows
      .map((q) => q.non_coding_question_id)
      .filter(Boolean);
    const questionCount = askedRows.length;

    let difficulty = "EASY";

    if (questionCount === 1) {
      difficulty = "MEDIUM";
    }

    if (questionCount >= 2) {
      difficulty = "HARD";
    }

    let question = null;
    let type = null;
    if (session.domain === "DSA") {

      const exclude =
        askedCodingIds.length > 0
          ? `AND id NOT IN (${askedCodingIds.join(",")})`
          : "";

      const [rows] = await db.execute(
        `SELECT *
         FROM problems
         WHERE difficulty = ?
         ${exclude}
         ORDER BY RAND()
         LIMIT 1`,
        [difficulty.toLowerCase()]
      );

      question = rows[0];

      if (question) {
        const [exampleRows] = await db.execute(
          `SELECT *
           FROM problem_examples
           WHERE problem_id = ?
           ORDER BY order_index ASC`,
          [question.id]
        );

        question.examples = exampleRows;

        type = "CODING";
      }
    }
    if (
      session.domain === "SYSTEM_DESIGN" ||
      session.domain === "BACKEND" ||
      session.domain === "FRONTEND"
    ) {

      const exclude =
        askedNonCodingIds.length > 0
          ? `AND id NOT IN (${askedNonCodingIds.join(",")})`
          : "";

      const [rows] = await db.execute(
        `SELECT *
         FROM non_coding_questions
         WHERE difficulty = ?
         ${exclude}
         ORDER BY RAND()
         LIMIT 1`,
        [difficulty]
      );

      question = rows[0];

      if (question) {
        type = "NON_CODING";
      }
    }
    if (!question) {
      return {
        completed: true,
        message: "No more questions available",
      };
    }
    await db.execute(
      `INSERT INTO interview_questions
       (
         session_id,
         coding_problem_id,
         non_coding_question_id,
         question_type,
         question_order
       )
       VALUES (?, ?, ?, ?, ?)`,
      [
        sessionId,

        type === "CODING"
          ? question.id
          : null,

        type === "NON_CODING"
          ? question.id
          : null,

        type,

        questionCount + 1,
      ]
    );
    return {
      completed: false,
      type,
      data: question,
    };

  } catch (err) {
    console.error("Selection Error:", err);
    throw err;
  }
};

export const startInterviewSession = async (
  userId,
  domain = "DSA",
  type = "AI",
  totalQuestions = 3
) => {

  try {

    const [result] = await db.execute(
      `INSERT INTO interview_sessions
       (
         user_id,
         type,
         domain,
         status,
         started_at,
         total_questions
       )
       VALUES (?, ?, ?, 'ONGOING', NOW(), ?)`,
      [
        userId,
        type,
        domain,
        totalQuestions,
      ]
    );

    return {
      sessionId: result.insertId,
    };

  } catch (err) {
    console.error("Start Interview Error:", err);
    throw err;
  }
};
export const submitAnswer = async ({
  sessionId,
  userId,
  code,
  language,
}) => {

  try {
    const [qRows] = await db.execute(
      `SELECT *
       FROM interview_questions
       WHERE session_id = ?
       ORDER BY question_order DESC
       LIMIT 1`,
      [sessionId]
    );

    const question = qRows[0];

    if (!question) {
      throw new Error("No question found");
    }
    if (question.question_type === "CODING") {
      const submissionResult =
        await handleSubmission({
          userId,
          problemId: question.coding_problem_id,
          code,
          language,
        });
      await db.execute(
        `INSERT INTO interview_submissions
         (
           session_id,
           question_id,
           code,
           language,
           result,
           feedback
         )
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          sessionId,
          question.id,
          code,
          language,
          submissionResult.status,
          submissionResult.status === "accepted"
            ? "Accepted"
            : "Rejected",
        ]
      );
      await db.execute(
        `UPDATE interview_sessions
         SET current_question_index =
             current_question_index + 1
         WHERE id = ?`,
        [sessionId]
      );

      return {
        result: submissionResult.status,
      };
    }
    if (question.question_type === "NON_CODING") {

      await db.execute(
        `INSERT INTO interview_submissions
         (
           session_id,
           question_id,
           result,
           feedback
         )
         VALUES (?, ?, ?, ?)`,
        [
          sessionId,
          question.id,
          "accepted",
          "Answer recorded",
        ]
      );

      await db.execute(
        `UPDATE interview_sessions
         SET current_question_index =
             current_question_index + 1
         WHERE id = ?`,
        [sessionId]
      );

      return {
        result: "accepted",
      };
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const generateInterviewReport = async (
  sessionId
) => {

  try {

    const [submissions] = await db.execute(
      `SELECT result
       FROM interview_submissions
       WHERE session_id = ?`,
      [sessionId]
    );

    const total = submissions.length;

    const correct = submissions.filter(
      (s) => s.result === "Accepted"
    ).length;

    const score = total
      ? (correct / total) * 100
      : 0;
    await db.execute(
      `INSERT INTO interview_reports
       (
         session_id,
         total_questions,
         correct_answers,
         score
       )
       VALUES (?, ?, ?, ?)`,
      [
        sessionId,
        total,
        correct,
        score,
      ]
    );

    return {
      total,
      correct,
      score,
    };

  } catch (err) {
    console.error("Report Error:", err);
    throw err;
  }
};