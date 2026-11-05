import { ChallengeKind } from '../../../../../../game/types';
import { ChoiceFields } from './ChoiceFields/ChoiceFields';
import { BuildFields } from './BuildFields/BuildFields';
import { NumberFields } from './NumberFields/NumberFields';
import { CreationFields } from './CreationFields/CreationFields';

interface FormatFieldsProps {
  kind: ChallengeKind;
}

const fields = {
  choice: ChoiceFields,
  number: NumberFields,
  build: BuildFields,
  create: CreationFields,
};

export function FormatFields({ kind }: FormatFieldsProps) {
  const Fields = fields[kind];

  return <Fields />;
}
