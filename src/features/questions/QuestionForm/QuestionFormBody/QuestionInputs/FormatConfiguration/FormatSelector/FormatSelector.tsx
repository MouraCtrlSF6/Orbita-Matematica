import { ChallengeKind } from '../../../../../../../game/types';
import { SelectField } from '../../SelectField/SelectField';

interface FormatSelectorProps {
  kind: ChallengeKind;
  setKind: (value: ChallengeKind) => void;
}

const formats = [
  {
    value: ChallengeKind.Choice,
    label: 'Objetiva',
    description: 'O aluno escolhe uma resposta entre as alternativas cadastradas.',
  },
  {
    value: ChallengeKind.Text,
    label: 'Discursiva',
    description: 'O aluno escreve uma resposta, que será comparada com a resposta esperada.',
  },
  {
    value: ChallengeKind.Build,
    label: 'Montagem de expressão',
    description: 'O aluno usa as peças disponíveis para montar uma expressão na ordem correta.',
  },
  {
    value: ChallengeKind.Create,
    label: 'Criação guiada',
    description:
      'O aluno personaliza uma situação escolhendo cristais ou peças e um valor de x entre 2, 3 e 4. Depois, calcula o total usando 2 × x + 4.',
  },
];

export function FormatSelector({ kind, setKind }: FormatSelectorProps) {
  return (
    <>
      <SelectField
        label="Formato"
        required
        value={kind}
        options={formats}
        onChange={(value) => setKind(value as ChallengeKind)}
      />
      <p className="text-small text-muted m-0">
        {formats.find((format) => format.value === kind)!.description}
      </p>
    </>
  );
}
