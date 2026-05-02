import db from "../config/db.js";

export const getNextQuestion = async (sessionId) => {
  try {
    const [sessionRows] = await db.execute(
      "SELECT * FROM interview_sessions WHERE id = ?",
      [sessionId]
    );

    const session = sessionRows[0];
    if (!session) throw new Error("Session not found");
    const [askedRows] = await db.execute(
      "SELECT coding_problem_id, non_coding_question_id FROM interview_questions WHERE session_id = ?",
      [sessionId]
    );

    const askedCodingIds = askedRows
      .map(q => q.coding_problem_id)
      .filter(Boolean);

    const askedNonCodingIds = askedRows
      .map(q => q.non_coding_question_id)
      .filter(Boolean);
    const questionCount = askedRows.length;

    let difficulty = "EASY";
    if (questionCount === 1) difficulty = "MEDIUM";
    if (questionCount >= 2) difficulty = "HARD";
    let question;

    if (session.domain === "DSA") {
      const [rows] = await db.execute(
        `SELECT * FROM problems
         WHERE difficulty = ?
         AND id NOT IN (${askedCodingIds.length ? askedCodingIds.join(",") : 0})
         ORDER BY RAND()
         LIMIT 1`,
        [difficulty.toLowerCase()]
      );

      question = rows[0];

      return {
        type: "CODING",
        data: question,
      };
    }

    if (session.domain === "SYSTEM_DESIGN") {
      const [rows] = await db.execute(
        `SELECT * FROM non_coding_questions
         WHERE difficulty = ?
         AND id NOT IN (${askedNonCodingIds.length ? askedNonCodingIds.join(",") : 0})
         ORDER BY RAND()
         LIMIT 1`,
        [difficulty]
      );

      question = rows[0];

      return {
        type: "NON_CODING",
        data: question,
      };
    }

  } catch (err) {
    console.error("Selection Error:", err);
    throw err;
  }
};
export const startInterviewSession = async (userId, domain = "DSA", type = "AI") => {
  try {
    const [result] = await db.execute(
      `INSERT INTO interview_sessions (user_id, type, domain, status, started_at)
       VALUES (?, ?, ?, 'ONGOING', NOW())`,
      [userId, type, domain]
    );

    return {
      sessionId: result.insertId,
    };

  } catch (err) {
    console.error("Start Interview Error:", err);
    throw err;
  }
};