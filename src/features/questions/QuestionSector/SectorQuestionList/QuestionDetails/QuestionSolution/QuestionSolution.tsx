import type { Mission } from '../../../../../../game/types';
import { expectedAnswer } from './utils/expectedAnswer';
import { QuestionFacts } from '../QuestionFacts/QuestionFacts';
import { QuestionHints } from './QuestionHints/QuestionHints';

interface QuestionSolutionProps {
  mission: Mission;
}

export function QuestionSolution({ mission }: QuestionSolutionProps) {
  const facts = [
    `Resposta esperada: ${expectedAnswer(mission)}`,
    `Explicação: ${mission.explanation}`,
  ];

  return (
    <>
      <QuestionFacts facts={facts} />
      <QuestionHints hints={mission.hints} />
    </>
  );
}
