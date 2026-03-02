export const submitInterview = async (req, res) => {
  try {
    const { question, transcript, typedAnswer } = req.body;

    console.log("Interview Data Received:");
    console.log({ question, transcript, typedAnswer });

    // this just returns the temporary data
    const mockEvaluation = {
      communication_score: 7.5,
      technical_score: 8,
      confidence_score: 6,
      feedback:
        "Good structure overall. Try to reduce filler words and add more edge case explanations.",
    };

    res.status(200).json(mockEvaluation);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};