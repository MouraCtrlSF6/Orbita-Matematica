interface CreationFieldsProps {
  context: string;
  variable: number;
  disabled: boolean;
  onContextChange: (value: string) => void;
  onVariableChange: (value: number) => void;
}

export function CreationFields({
  context,
  variable,
  disabled,
  onContextChange,
  onVariableChange,
}: CreationFieldsProps) {
  return (
    <fieldset className="creation-fields" disabled={disabled}>
      <legend>Crie seu problema</legend>
      <div className="creation-selects">
        <label>
          Carga da missão
          <select value={context} onChange={(event) => onContextChange(event.target.value)}>
            <option value="cristais">Cristais de energia</option>
            <option value="peças">Peças de reparo</option>
          </select>
        </label>
        <label>
          Quantidade de robôs (x)
          <select
            value={variable}
            onChange={(event) => onVariableChange(Number(event.target.value))}
          >
            {[2, 3, 4].map((value) => (
              <option value={value} key={value}>
                {value} robôs
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="created-story">
        <span className="eyebrow">SEU ENUNCIADO</span>
        <p>
          Cada um dos {variable} robôs leva 2 {context}. A base guarda mais 4 {context}. Quantos{' '}
          {context} temos ao todo?
        </p>
        <span>Regra: 2 × x + 4, com x = {variable}.</span>
      </div>
    </fieldset>
  );
}
