import { ChoiceRow } from './ChoiceRow/ChoiceRow';
import type { useChoices } from '../../hooks/useChoices';

interface ChoiceRowsProps {
  choices: ReturnType<typeof useChoices>;
  onSelect: (id: string) => void;
}

export function ChoiceRows({ choices, onSelect }: ChoiceRowsProps) {
  return (
    <>
      {choices.ids.map((id, index) => (
        <ChoiceRow
          key={id}
          id={id}
          number={index + 1}
          checked={choices.correct === id}
          onSelect={() => onSelect(id)}
          canRemove={choices.ids.length > 2}
          onRemove={() => choices.remove(id)}
        />
      ))}
    </>
  );
}
