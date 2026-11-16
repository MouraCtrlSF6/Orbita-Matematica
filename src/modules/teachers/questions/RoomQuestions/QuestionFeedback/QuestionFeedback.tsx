interface QuestionFeedbackProps {
  error: string;
  message: string;
}

export function QuestionFeedback({ error, message }: QuestionFeedbackProps) {
  return (
    <>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
    </>
  );
}
