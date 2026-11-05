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
    <div className="creation-selects flex flex-wrap gap-4 [&_label]:text-small [&_label]:font-semibold [&_label]:[flex:1] [&_label]:min-w-42.5 [&_select]:block [&_select]:w-full [&_select]:p-3 [&_select]:[border:1px_solid_#d4cadd] [&_select]:rounded-control [&_select]:mt-[0.4375rem] [&_select]:bg-white [&_select]:text-[#62516f] ds-down-mobile:gap-2.5 ds-down-mobile:[&_label]:min-w-35">
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
    <div className="created-story [background:#f6f2fb] p-[1.0625rem] rounded-option mt-4.5 text-support [&_p]:my-2 [&_p]:mx-0 [&_>_span:last-child]:text-label [&_>_span:last-child]:text-[#7e6995]">
      <span className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SEU ENUNCIADO
      </span>
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
    <fieldset
      className="creation-fields [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={props.disabled}
    >
      <legend>Crie seu problema</legend>
      <CreationChoices {...props} />
      <CreatedStory {...props} />
    </fieldset>
  );
}
