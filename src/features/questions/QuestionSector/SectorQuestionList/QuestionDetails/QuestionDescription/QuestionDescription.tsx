import type { Mission } from '../../../../../../game/types';
import { QuestionFacts } from '../QuestionFacts/QuestionFacts';
import { QuestionChoices } from './QuestionChoices/QuestionChoices';

interface QuestionDescriptionProps {
  mission: Mission;
}

export function QuestionDescription({ mission }: QuestionDescriptionProps) {
  const facts = [
    mission.prompt,
    `Expressão: ${mission.formula} · x = ${mission.variable}`,
    `Objetivo: ${mission.objective} · Habilidade: ${mission.skill}`,
  ];

  return (
    <>
      <QuestionFacts facts={facts} />
      <QuestionChoices choices={mission.choices} />
    </>
  );
}
