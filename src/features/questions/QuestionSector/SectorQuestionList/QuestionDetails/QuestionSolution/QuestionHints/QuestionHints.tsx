interface QuestionHintsProps {
  hints: string[];
}

export function QuestionHints({ hints }: QuestionHintsProps) {
  return (
    <ol>
      {hints.map((hint, index) => (
        <li key={index}>{hint}</li>
      ))}
    </ol>
  );
}
