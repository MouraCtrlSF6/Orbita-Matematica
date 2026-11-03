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
      <span className="option-letter" aria-hidden="true">
        {String.fromCharCode(65 + index)}
      </span>
      <span>{choice.label}</span>
    </>
  );
}
function ChoiceOption({ choice, index, answer, onChange, disabled }: ChoiceOptionProps) {
  return (
    <label className={`answer-option ${answer === choice.value ? 'selected' : ''}`}>
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
    <fieldset className="answer-options" disabled={props.disabled}>
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
      className="clear-tokens"
      onClick={() => onChange(selectedTokens(answer).slice(0, -1).join(' '))}
      disabled={disabled || !answer}
    >
      Desfazer
    </button>
  );
}
function TokenRow(props: AnswerInputProps) {
  return (
    <div className="token-row">
      {props.mission.tokens?.map((token) => (
        <TokenButton key={token} {...props} token={token} />
      ))}
      <UndoButton {...props} />
    </div>
  );
}
function ExpressionSlots({ answer }: { answer: string }) {
  return (
    <div className="expression-slots" aria-live="polite">
      {answer || 'Sua expressão aparece aqui'}
    </div>
  );
}
const buildHelp = (
  <p className="field-help">
    Selecione os símbolos da esquerda para a direita. Use Desfazer para corrigir.
  </p>
);
function BuildAnswer(props: AnswerInputProps) {
  return (
    <fieldset className="build-answer" disabled={props.disabled}>
      <legend>Monte a expressão na ordem</legend>
      <ExpressionSlots answer={props.answer} />
      <TokenRow {...props} />
      {buildHelp}
    </fieldset>
  );
}
const numberHelp = (
  <p className="field-help" id="number-help">
    Use um número inteiro, como 6.
  </p>
);
function NumberAnswer({ answer, onChange, disabled }: AnswerInputProps) {
  return (
    <div className="number-answer">
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
