import type { AnswerControlProps } from './answer-control';
import { selectedTokens } from './utils/selectedTokens';

export function UndoButton({ answer, disabled, onChange }: AnswerControlProps) {
  return (
    <button
      type="button"
      className="clear-tokens [.token-row_&:is(button)]:text-label [.token-row_&:is(button)]:bg-white [.token-row_&:is(button)]:tracking-[0]"
      onClick={() => onChange(selectedTokens(answer).slice(0, -1).join(' '))}
      disabled={disabled || !answer}
    >
      Desfazer
    </button>
  );
}
