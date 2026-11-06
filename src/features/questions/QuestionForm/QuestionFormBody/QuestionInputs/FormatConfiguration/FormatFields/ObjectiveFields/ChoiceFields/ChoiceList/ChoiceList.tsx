import { useState } from 'react';
import { ChoiceRows } from './ChoiceRows/ChoiceRows';
import type { useChoices } from '../hooks/useChoices';

interface ChoiceListProps {
  choices: ReturnType<typeof useChoices>;
}

export function ChoiceList({ choices }: ChoiceListProps) {
  const [error, setError] = useState('');
  const select = (id: string) => {
    choices.select(id);
    setError('');
  };

  return (
    <div
      className="grid gap-3"
      onInvalidCapture={() => setError('Preencha as alternativas e selecione a resposta correta.')}
    >
      <ChoiceRows choices={choices} onSelect={select} />
      <p hidden={!error} className="text-small text-danger m-0" aria-live="polite">
        {error}
      </p>
    </div>
  );
}
