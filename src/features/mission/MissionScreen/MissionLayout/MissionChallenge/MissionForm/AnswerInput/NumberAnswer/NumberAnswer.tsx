import type { AnswerControlProps } from '../answer-control';

const numberHelp = (
  <p className="field-help text-label text-[#6c6278] my-2 mx-0" id="number-help">
    Use um número inteiro, como 6.
  </p>
);

export function NumberAnswer({ answer, onChange, disabled }: AnswerControlProps) {
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
