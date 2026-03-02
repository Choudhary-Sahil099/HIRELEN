import OpenAI from "openai";

export const submitInterview = async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { question, transcript, typedAnswer } = req.body;
    const combinedAnswer = transcript || typedAnswer;

    const prompt = `
You are an AI interview evaluator.

Question:
${question}

Candidate Answer:
${combinedAnswer}

Return JSON:
{
  "communication_score": number,
  "technical_score": number,
  "confidence_score": number,
  "feedback": "detailed feedback"
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional interview evaluator.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const aiText = response.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(aiText);
    } catch {
      parsed = {
        communication_score: 7,
        technical_score: 7,
        confidence_score: 7,
        feedback: aiText,
      };
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("AI Evaluation Error:", error);
    res.status(500).json({ message: "AI evaluation failed" });
  }
};
