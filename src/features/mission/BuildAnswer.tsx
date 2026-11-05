import type { AnswerControlProps } from './answer-control';
import { ExpressionSlots } from './ExpressionSlots';
import { TokenRow } from './TokenRow';

export interface BuildAnswerProps extends AnswerControlProps {
  tokens?: string[];
}

const buildHelp = (
  <p className="field-help text-label text-[#6c6278] my-2 mx-0">
    Selecione os símbolos da esquerda para a direita. Use Desfazer para corrigir.
  </p>
);

export function BuildAnswer({ tokens, ...controls }: BuildAnswerProps) {
  return (
    <fieldset
      className="build-answer [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={controls.disabled}
    >
      <legend>Monte a expressão na ordem</legend>
      <ExpressionSlots answer={controls.answer} />
      <TokenRow tokens={tokens} {...controls} />
      {buildHelp}
    </fieldset>
  );
}
