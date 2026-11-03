interface CreationFieldsProps {
  context: string;
  variable: number;
  disabled: boolean;
  onContextChange: (value: string) => void;
  onVariableChange: (value: number) => void;
}
interface SelectOption {
  value: string | number;
  label: string;
}
interface CreationSelectProps {
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string) => void;
}
const cargoOptions = [
  { value: 'cristais', label: 'Cristais de energia' },
  { value: 'peças', label: 'Peças de reparo' },
];
const robotOptions = [2, 3, 4].map((value) => ({ value, label: `${value} robôs` }));
function SelectOptions({ options }: { options: SelectOption[] }) {
  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}
function CreationSelect({ label, value, options, onChange }: CreationSelectProps) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <SelectOptions options={options} />
      </select>
    </label>
  );
}
function CreationChoices(props: CreationFieldsProps) {
  return (
    <div className="creation-selects">
      <CreationSelect
        label="Carga da missão"
        value={props.context}
        options={cargoOptions}
        onChange={props.onContextChange}
      />
      <CreationSelect
        label="Quantidade de robôs (x)"
        value={props.variable}
        options={robotOptions}
        onChange={(value) => props.onVariableChange(Number(value))}
      />
    </div>
  );
}
function CreatedStory({ context, variable }: CreationFieldsProps) {
  return (
    <div className="created-story">
      <span className="eyebrow">SEU ENUNCIADO</span>
      <p>
        Cada um dos {variable} robôs leva 2 {context}. A base guarda mais 4 {context}. Quantos{' '}
        {context} temos ao todo?
      </p>
      <span>Regra: 2 × x + 4, com x = {variable}.</span>
    </div>
  );
}
export function CreationFields(props: CreationFieldsProps) {
  return (
    <fieldset className="creation-fields" disabled={props.disabled}>
      <legend>Crie seu problema</legend>
      <CreationChoices {...props} />
      <CreatedStory {...props} />
    </fieldset>
  );
}
