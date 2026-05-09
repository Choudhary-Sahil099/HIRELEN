export const evaluateCandidate = ({
  currentState,
  userMessage,
  code,
  reviewResult,
}) => {

  const lower =
    userMessage
      ?.toLowerCase()
      ?.trim() || "";
  const evaluation = {
    introCompleted: false,
    setupCompleted: false,
    questionUnderstood: false,
    approachReady: false,
    submittedCode: false,
    averageScore: 0,
    communicationScore: 5,
    codingScore: 5,
    optimizationScore: 5,
    problemSolvingScore: 5,
  };

  if (
    currentState?.trim() === "INTRO"
  ) {

    if (

      userMessage.length > 20 &&

      (
        lower.includes("i am") ||
        lower.includes("my name") ||
        lower.includes("developer") ||
        lower.includes("student") ||
        lower.includes("dsa") ||
        lower.includes("backend") ||
        lower.includes("frontend") ||
        lower.includes("ai")
      )

    ) {

      evaluation.introCompleted = true;

      evaluation.communicationScore = 7;

      evaluation.problemSolvingScore = 6;
    }
  }

  if (
    currentState?.trim() === "SETUP"
  ) {

    const languages = [
      "cpp",
      "c++",
      "python",
      "java",
      "javascript",
    ];

    const difficulties = [
      "easy",
      "medium",
      "hard",
    ];

    const hasLanguage =
      languages.some(lang =>
        lower.includes(lang)
      );

    const hasDifficulty =
      difficulties.some(level =>
        lower.includes(level)
      );

    if (
      hasLanguage &&
      hasDifficulty
    ) {

      evaluation.setupCompleted = true;

      evaluation.communicationScore = 7;
    }
  }

  if (
    currentState?.trim() ===
    "QUESTION_INTRO"
  ) {

    if (

      lower.includes("understood") ||
      lower.includes("got it") ||
      lower.includes("okay") ||
      lower.includes("ok") ||
      lower.includes("find") ||
      lower.includes("basically")

    ) {

      evaluation.questionUnderstood = true;

      evaluation.communicationScore = 7;
    }
  }

  if (
    currentState?.trim() ===
    "APPROACH_DISCUSSION"
  ) {
    if (

      lower.includes("loop") ||
      lower.includes("hashmap") ||
      lower.includes("pointer") ||
      lower.includes("stack") ||
      lower.includes("queue") ||
      lower.includes("recursion") ||
      lower.includes("binary search") ||
      lower.includes("dp")

    ) {

      evaluation.approachReady = true;

      evaluation.problemSolvingScore = 7;
    }
    if (

      lower.includes("optimize") ||
      lower.includes("efficient") ||
      lower.includes("o(n)") ||
      lower.includes("complexity")

    ) {

      evaluation.optimizationScore = 8;
    }
    if (
      userMessage.length > 50
    ) {

      evaluation.communicationScore = 7;
    }
  }

  if (
    currentState?.trim() ===
    "CODING"
  ) {

    if (
      code &&
      code.length > 20
    ) {

      evaluation.submittedCode = true;

      evaluation.codingScore = 7;
    }
  }

  if (
    currentState?.trim() ===
    "CODE_REVIEW"
  ) {

    if (
      reviewResult?.result ===
      "accepted"
    ) {

      evaluation.codingScore = 9;

      evaluation.problemSolvingScore = 8;
    }

    if (
      reviewResult?.result ===
      "rejected"
    ) {

      evaluation.codingScore = 4;
    }
    if (

      reviewResult?.complexity
        ?.optimized?.time === "O(n)"

    ) {

      evaluation.optimizationScore = 9;
    }
  }

  evaluation.averageScore =
    Math.round(

      (
        evaluation.communicationScore +
        evaluation.codingScore +
        evaluation.optimizationScore +
        evaluation.problemSolvingScore
      ) / 4

    );

  return evaluation;
};