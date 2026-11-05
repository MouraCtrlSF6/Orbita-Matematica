import type { TutorialPageProps } from '../../../../../tutorial-view';

export interface PracticeOptionProps {
  value: string;
  answer: string;
  onAnswer: TutorialPageProps['onAnswer'];
}

export function PracticeOption({ value, answer, onAnswer }: PracticeOptionProps) {
  return (
    <label
      className={`answer-option relative flex items-center gap-[0.8125rem] py-3.5 px-4 [border:1px_solid_#e2e1ea] rounded-option my-[0.5625rem] mx-0 bg-white text-body cursor-pointer min-h-13.5 ds-hover:[border-color:#b5a4d1] ds-hover:[background:#faf8fd] ds-selected:border-selected-border ds-selected:bg-selected [&_input]:[accent-color:#7a60b6] [&_input]:w-[1.0625rem] [&_input]:h-[1.0625rem] [&_input]:shrink-0 ${answer === value ? 'selected' : ''}`}
    >
      <input
        type="radio"
        name="tutorial-answer"
        value={value}
        checked={answer === value}
        onChange={() => onAnswer(value)}
      />
      {value} cristais
    </label>
  );
}
