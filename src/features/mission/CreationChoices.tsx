import { type CreationFieldsProps } from './creation-fields-types';
import { CreationSelect } from './CreationSelect';

const cargoOptions = [
  { value: 'cristais', label: 'Cristais de energia' },
  { value: 'peças', label: 'Peças de reparo' },
];

const robotOptions = [2, 3, 4].map((value) => ({ value, label: `${value} robôs` }));

interface CreationChoicesProps {
  context: CreationFieldsProps['context'];
  variable: CreationFieldsProps['variable'];
  onContextChange: CreationFieldsProps['onContextChange'];
  onVariableChange: CreationFieldsProps['onVariableChange'];
}

export function CreationChoices(props: CreationChoicesProps) {
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
