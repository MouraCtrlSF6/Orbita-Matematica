import { sectors } from '../../../../../../content/sectors';
import { ChallengeKind } from '../../../../../../game/types';
import { SelectField } from '../SelectField/SelectField';

interface QuestionSelectorsProps {
  kind: ChallengeKind;
  setKind: (kind: ChallengeKind) => void;
}

const sectorOptions = sectors.map((sector) => ({ value: sector.id, label: sector.name }));
const formats = [
  { value: 'choice', label: 'Alternativas' },
  { value: 'number', label: 'Resposta numérica' },
  { value: 'build', label: 'Montagem de expressão' },
  { value: 'create', label: 'Criação guiada' },
];

export function QuestionSelectors({ kind, setKind }: QuestionSelectorsProps) {
  return (
    <>
      <SelectField label="Setor" name="sectorId" options={sectorOptions} />
      <SelectField
        label="Formato"
        value={kind}
        options={formats}
        onChange={(value) => setKind(value as ChallengeKind)}
      />
    </>
  );
}
