export const mapSubmissionToActivity = (submission: any) => {
  return {
    title: submission.problem,
    difficulty: submission.difficulty || "easy",
    category: submission.category || "general",

    time: new Date(submission.created_at).toLocaleString(),

    runtime: submission.runtime
      ? `${Number(submission.runtime).toFixed(2)} ms`
      : undefined,

    status:
      submission.status === "accepted"
        ? "success"
        : submission.status === "tle"
        ? "tle"
        : submission.status === "pending"
        ? "pending"
        : "error",
  };
};