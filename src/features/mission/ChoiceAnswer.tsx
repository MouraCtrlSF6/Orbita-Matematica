import type { Choice } from '../../game/types';
import type { AnswerControlProps } from './answer-control';
import { ChoiceOption } from './ChoiceOption';

export interface ChoiceAnswerProps extends AnswerControlProps {
  choices?: Choice[];
}

export function ChoiceAnswer({ choices, ...controls }: ChoiceAnswerProps) {
  return (
    <fieldset
      className="answer-options [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={controls.disabled}
    >
      <legend>Escolha sua resposta</legend>
      {choices?.map((choice, index) => (
        <ChoiceOption key={choice.value} {...controls} choice={choice} index={index} />
      ))}
    </fieldset>
  );
}
