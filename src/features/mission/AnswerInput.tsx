import type { ReactNode } from 'react';
import { ChallengeKind, type Mission, type Choice } from '../../game/types';
interface AnswerInputProps {
  mission: Mission;
  answer: string;
  onChange: (answer: string) => void;
  disabled: boolean;
}
interface ChoiceOptionProps extends AnswerInputProps {
  choice: Choice;
  index: number;
}
function ChoiceLabel({ choice, index }: { choice: Choice; index: number }) {
  return (
    <>
      <span
        className="option-letter text-caption text-[#82778e] [border:1px_solid_#e3dce9] rounded-xs py-0.5 px-1.5"
        aria-hidden="true"
      >
        {String.fromCharCode(65 + index)}
      </span>
      <span>{choice.label}</span>
    </>
  );
}
function ChoiceOption({ choice, index, answer, onChange, disabled }: ChoiceOptionProps) {
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
function Choices(props: AnswerInputProps) {
  return (
    <>
      {props.mission.choices?.map((choice, index) => (
        <ChoiceOption key={choice.value} {...props} choice={choice} index={index} />
      ))}
    </>
  );
}
function ChoiceAnswer(props: AnswerInputProps) {
  return (
    <fieldset
      className="answer-options [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={props.disabled}
    >
      <legend>Escolha sua resposta</legend>
      <Choices {...props} />
    </fieldset>
  );
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
function selectedTokens(answer: string): string[] {
  return answer ? answer.split(' ') : [];
}
interface TokenProps extends AnswerInputProps {
  token: string;
}
function TokenButton({ token, answer, disabled, onChange }: TokenProps) {
  const selected = selectedTokens(answer);
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
function UndoButton({ answer, disabled, onChange }: AnswerInputProps) {
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
function TokenRow(props: AnswerInputProps) {
  return (
    <div className="token-row flex gap-[0.5625rem] flex-wrap my-[0.9375rem] mx-0 [&_button]:[border:1px_solid_#cebfdf] [&_button]:[background:#f1eafa] [&_button]:text-[#6c4f8e] [&_button]:rounded-control [&_button]:py-2.5 [&_button]:px-4 [&_button]:text-control [&_button]:min-w-[2.9375rem] [&_button:disabled]:[opacity:0.4] ds-down-mobile:gap-[0.4375rem] ds-down-mobile:[&_button]:py-2.5 ds-down-mobile:[&_button]:px-3">
      {props.mission.tokens?.map((token) => (
        <TokenButton key={token} {...props} token={token} />
      ))}
      <UndoButton {...props} />
    </div>
  );
}
function ExpressionSlots({ answer }: { answer: string }) {
  return (
    <div
      className="expression-slots p-5 [background:#f9f7fc] [border:0.125rem_dashed_#d2c5e3] rounded-soft min-h-18 flex items-center justify-center text-[#71607e] text-dialog-body tracking-[0.125rem]"
      aria-live="polite"
    >
      {answer || 'Sua expressão aparece aqui'}
    </div>
  );
}
const buildHelp = (
  <p className="field-help text-label text-[#6c6278] my-2 mx-0">
    Selecione os símbolos da esquerda para a direita. Use Desfazer para corrigir.
  </p>
);
function BuildAnswer(props: AnswerInputProps) {
  return (
    <fieldset
      className="build-answer [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={props.disabled}
    >
      <legend>Monte a expressão na ordem</legend>
      <ExpressionSlots answer={props.answer} />
      <TokenRow {...props} />
      {buildHelp}
    </fieldset>
  );
}
const numberHelp = (
  <p className="field-help text-label text-[#6c6278] my-2 mx-0" id="number-help">
    Use um número inteiro, como 6.
  </p>
);
function NumberAnswer({ answer, onChange, disabled }: AnswerInputProps) {
  return (
    <div className="number-answer mt-[1.5625rem] [&_label]:block [&_label]:font-semibold [&_label]:text-body [&_label]:mb-[0.5625rem] [&_input]:w-full [&_input]:max-w-80 [&_input]:[border:1px_solid_#c8c3d3] [&_input]:bg-white [&_input]:rounded-option [&_input]:py-[0.8125rem] [&_input]:px-[0.9375rem] [&_input]:text-subheading [&_input]:text-[#373040]">
      <label htmlFor="numeric-answer">Qual é o total?</label>
      <input
        id="numeric-answer"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={answer}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder="Digite um número"
        required
        aria-describedby="number-help"
      />
      {numberHelp}
    </div>
  );
}
const formats = {
  [ChallengeKind.Choice]: ChoiceAnswer,
  [ChallengeKind.Build]: BuildAnswer,
  [ChallengeKind.Number]: NumberAnswer,
  [ChallengeKind.Create]: NumberAnswer,
};
export function AnswerInput(props: AnswerInputProps) {
  const Format = formats[props.mission.kind];
  return <Format {...props} />;
}
