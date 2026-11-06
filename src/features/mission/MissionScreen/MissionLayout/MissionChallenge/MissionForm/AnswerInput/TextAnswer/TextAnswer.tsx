import { useId } from 'react';
import { Input } from '../../../../../../../../components/Input/Input';
import type { AnswerControlProps } from '../answer-control';

export function TextAnswer({ answer, onChange, disabled }: AnswerControlProps) {
  const id = useId();

  return (
    <div className="grid gap-2 mt-6">
      <label htmlFor={id} className="font-semibold">
        Sua resposta
      </label>
      <Input
        id={id}
        value={answer}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        required
        maxLength={2000}
        autoComplete="off"
        placeholder="Escreva sua resposta"
      />
    </div>
  );
}
