import type { Choice } from '../../game/types';
import type { AnswerControlProps } from './answer-control';
import { ChoiceLabel } from './ChoiceLabel';

export interface ChoiceOptionProps extends AnswerControlProps {
  choice: Choice;
  index: number;
}

export function ChoiceOption({ choice, index, answer, onChange, disabled }: ChoiceOptionProps) {
  return (
    <label
      className={`answer-option relative flex items-center gap-[0.8125rem] py-3.5 px-4 [border:1px_solid_#e2e1ea] rounded-option my-[0.5625rem] mx-0 bg-white text-body cursor-pointer min-h-13.5 ds-hover:[border-color:#b5a4d1] ds-hover:[background:#faf8fd] ds-selected:border-selected-border ds-selected:bg-selected [&_input]:[accent-color:#7a60b6] [&_input]:w-[1.0625rem] [&_input]:h-[1.0625rem] [&_input]:shrink-0 ${answer === choice.value ? 'selected' : ''}`}
    >
      <input
        type="radio"
        name="answer"
        value={choice.value}
        checked={answer === choice.value}
        onChange={() => onChange(choice.value)}
        disabled={disabled}
      />
      <ChoiceLabel choice={choice} index={index} />
    </label>
  );
}
