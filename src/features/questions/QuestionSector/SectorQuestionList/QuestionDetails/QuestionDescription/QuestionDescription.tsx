import type { Mission } from '../../../../../../game/types';
import { QuestionFacts } from '../QuestionFacts/QuestionFacts';
import { QuestionChoices } from './QuestionChoices/QuestionChoices';

interface QuestionDescriptionProps {
  mission: Mission;
}

export function QuestionDescription({ mission }: QuestionDescriptionProps) {
  const facts = [
    mission.prompt,
    mission.formula ? `Expressão: ${mission.formula}` : '',
    mission.objective ? `Objetivo: ${mission.objective}` : '',
    mission.skill ? `Habilidade: ${mission.skill}` : '',
  ];

  return (
    <>
      <QuestionFacts facts={facts.filter(Boolean)} />
      <QuestionChoices choices={mission.choices} />
    </>
  );
}
