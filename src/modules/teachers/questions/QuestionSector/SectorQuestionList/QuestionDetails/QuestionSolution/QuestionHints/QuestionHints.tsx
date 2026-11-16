interface QuestionHintsProps {
  hints: string[];
}

export function QuestionHints({ hints }: QuestionHintsProps) {
  if (!hints.length) return null;
  return (
    <ol>
      {hints.map((hint, index) => (
        <li key={index}>{hint}</li>
      ))}
    </ol>
  );
}
