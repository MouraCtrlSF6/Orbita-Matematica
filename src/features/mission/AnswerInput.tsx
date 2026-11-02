import { ChallengeKind, type Mission } from '../../game/types';

interface AnswerInputProps {
  mission: Mission;
  answer: string;
  onChange: (answer: string) => void;
  disabled: boolean;
}

export function AnswerInput({ mission, answer, onChange, disabled }: AnswerInputProps) {
  if (mission.kind === ChallengeKind.Choice) {
    return (
      <fieldset className="answer-options" disabled={disabled}>
        <legend>Escolha sua resposta</legend>
        {mission.choices?.map((choice, index) => (
          <label
            key={choice.value}
            className={`answer-option ${answer === choice.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="answer"
              value={choice.value}
              checked={answer === choice.value}
              onChange={() => onChange(choice.value)}
            />
            <span className="option-letter" aria-hidden="true">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{choice.label}</span>
          </label>
        ))}
      </fieldset>
    );
  }
  if (mission.kind === ChallengeKind.Build) {
    const selected = answer ? answer.split(' ') : [];
    return (
      <fieldset className="build-answer" disabled={disabled}>
        <legend>Monte a expressão na ordem</legend>
        <div className="expression-slots" aria-live="polite">
          {answer || 'Sua expressão aparece aqui'}
        </div>
        <div className="token-row">
          {mission.tokens?.map((token) => (
            <button
              type="button"
              key={token}
              disabled={disabled || selected.includes(token)}
              onClick={() => onChange([...selected, token].join(' '))}
            >
              {token === '×' ? (
                <>
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Multiplicação</span>
                </>
              ) : token === '+' ? (
                <>
                  <span aria-hidden="true">+</span>
                  <span className="sr-only">Adição</span>
                </>
              ) : (
                token
              )}
            </button>
          ))}
          <button
            type="button"
            className="clear-tokens"
            onClick={() => onChange(selected.slice(0, -1).join(' '))}
            disabled={disabled || !answer}
          >
            Desfazer
          </button>
        </div>
        <p className="field-help">
          Selecione os símbolos da esquerda para a direita. Use Desfazer para corrigir.
        </p>
      </fieldset>
    );
  }
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
      <p className="field-help" id="number-help">
        Use um número inteiro, como 6.
      </p>
    </div>
  );
}
