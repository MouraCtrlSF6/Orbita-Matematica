interface QuestionSubmissionProps {
  error: string;
}

export function QuestionSubmission({ error }: QuestionSubmissionProps) {
  return (
    <>
      <p>Confira o resultado, as dicas e a representação visual antes de adicionar.</p>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Adicionar questão à sala</button>
    </>
  );
}
