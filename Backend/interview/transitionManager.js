export const getNextState = ({
  currentState,
  session,
  evaluation,
}) => {

  switch (currentState) {

    case "INTRO":

      if (evaluation?.introCompleted) {
        return "SETUP";
      }

      return "INTRO";

    case "SETUP":

      if (evaluation?.setupCompleted) {
        return "QUESTION_INTRO";
      }

      return "SETUP";

    case "QUESTION_INTRO":

      if (evaluation?.questionUnderstood) {
        return "APPROACH_DISCUSSION";
      }

      return "QUESTION_INTRO";

    case "APPROACH_DISCUSSION":

      if (evaluation?.approachReady) {
        return "CODING";
      }

      return "APPROACH_DISCUSSION";

    case "CODING":

      if (evaluation?.submittedCode) {
        return "CODE_REVIEW";
      }

      return "CODING";

    case "CODE_REVIEW":

      if (
        evaluation?.averageScore >= 7
      ) {

        const nextIndex =
          session.current_question_index + 1;

        if (
          nextIndex <
          session.total_questions
        ) {

          return "QUESTION_INTRO";
        }

        return "FINAL_FEEDBACK";
      }

      return "FOLLOW_UP";

    case "FOLLOW_UP":

      if (
        evaluation?.averageScore >= 7
      ) {

        const nextIndex =
          session.current_question_index + 1;

        if (
          nextIndex <
          session.total_questions
        ) {

          return "QUESTION_INTRO";
        }

        return "FINAL_FEEDBACK";
      }

      return "FOLLOW_UP";

    case "FINAL_FEEDBACK":
      return "FINAL_FEEDBACK";

    default:
      return currentState;
  }
};