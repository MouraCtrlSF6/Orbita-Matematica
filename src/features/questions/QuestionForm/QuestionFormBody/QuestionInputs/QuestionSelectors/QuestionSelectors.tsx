import { sectors } from '../../../../../../content/sectors';
import { SelectField } from '../SelectField/SelectField';

interface QuestionSelectorsProps {
  sectorId: string;
  onChange: (value: string) => void;
}

const sectorOptions = sectors.map((sector) => ({
  value: sector.id,
  label: sector.number + ' — ' + sector.name,
}));

export function QuestionSelectors({ sectorId, onChange }: QuestionSelectorsProps) {
  return (
    <SelectField
      label="Setor"
      name="sectorId"
      required
      value={sectorId}
      options={sectorOptions}
      onChange={onChange}
    />
  );
}
