import type { Choice } from '../../../../../../../game/types';

interface QuestionChoicesProps {
  choices?: Choice[];
}

export function QuestionChoices({ choices = [] }: QuestionChoicesProps) {
  return (
    <ul>
      {choices.map((choice) => (
        <li key={choice.value}>{choice.label}</li>
      ))}
    </ul>
  );
}
