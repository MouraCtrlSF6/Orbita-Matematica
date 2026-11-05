import type { AnswerControlProps } from './answer-control';
import { selectedTokens } from './utils/selectedTokens';
import { TokenButton } from './TokenButton';
import { UndoButton } from './UndoButton';

export interface TokenRowProps extends AnswerControlProps {
  tokens?: string[];
}

export function TokenRow({ tokens, ...controls }: TokenRowProps) {
  const selected = selectedTokens(controls.answer);

  return (
    <div className="token-row flex gap-[0.5625rem] flex-wrap my-[0.9375rem] mx-0 [&_button]:[border:1px_solid_#cebfdf] [&_button]:[background:#f1eafa] [&_button]:text-[#6c4f8e] [&_button]:rounded-control [&_button]:py-2.5 [&_button]:px-4 [&_button]:text-control [&_button]:min-w-[2.9375rem] [&_button:disabled]:[opacity:0.4] ds-down-mobile:gap-[0.4375rem] ds-down-mobile:[&_button]:py-2.5 ds-down-mobile:[&_button]:px-3">
      {tokens?.map((token) => (
        <TokenButton
          key={token}
          selected={selected}
          disabled={controls.disabled}
          onChange={controls.onChange}
          token={token}
        />
      ))}
      <UndoButton {...controls} />
    </div>
  );
}
