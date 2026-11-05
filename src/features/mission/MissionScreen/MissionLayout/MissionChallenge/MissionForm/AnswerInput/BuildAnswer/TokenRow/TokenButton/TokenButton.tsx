import type { ReactNode } from 'react';
import type { AnswerControlProps } from '../../../answer-control';

export interface TokenButtonProps extends Pick<AnswerControlProps, 'disabled' | 'onChange'> {
  token: string;
  selected: string[];
}

const tokenLabels: Record<string, ReactNode> = {
  '×': (
    <>
      <span aria-hidden="true">×</span>
      <span className="sr-only">Multiplicação</span>
    </>
  ),
  '+': (
    <>
      <span aria-hidden="true">+</span>
      <span className="sr-only">Adição</span>
    </>
  ),
};

export function TokenButton({ token, selected, disabled, onChange }: TokenButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || selected.includes(token)}
      onClick={() => onChange([...selected, token].join(' '))}
    >
      {tokenLabels[token] ?? token}
    </button>
  );
}
