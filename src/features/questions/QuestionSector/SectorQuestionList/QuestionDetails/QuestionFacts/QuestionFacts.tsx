interface QuestionFactsProps {
  facts: string[];
}

export function QuestionFacts({ facts }: QuestionFactsProps) {
  return (
    <div className="grid gap-2 mt-3">
      {facts.map((fact, index) => (
        <p key={index}>{fact}</p>
      ))}
    </div>
  );
}
