import baseRules from "./baseRules.js";

const buildQuestionIntroPrompt = ({
  question,
}) => {
  if (
    !question ||
    !question.data
  ) {

    return `
${baseRules}

Tell the candidate:
"There was an issue loading the question."
`;
  }

  const problem =
    question.data;

  const examples =
    problem.examples || [];

  return `
${baseRules}

Current State:
QUESTION_INTRO

You are introducing a real coding interview problem.

IMPORTANT:
- Maximum 3 short paragraphs
- Be concise and professional
- Do NOT solve the problem
- Do NOT give hints immediately
- Explain naturally like a real interviewer

Problem Title:
${problem.title}

Problem Description:
${problem.description}

Examples:
${examples
  .map(
    ex => `
Input:
${ex.input}

Output:
${ex.output}
`
  )
  .join("\n")}

Your responsibilities:
1. Introduce the problem
2. Explain clearly
3. Ask if candidate understood
4. Invite questions

Good Example:
"Your first problem is Two Sum.

Given an array of integers and a target value, return indices of the two numbers that add up to the target.

Take a moment to read it and let me know if you'd like any clarification."
`;
};

export default buildQuestionIntroPrompt;