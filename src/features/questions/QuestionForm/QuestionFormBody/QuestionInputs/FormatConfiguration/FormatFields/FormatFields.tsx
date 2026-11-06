import { ChallengeKind } from '../../../../../../../game/types';
import { BuildFields } from './BuildFields/BuildFields';
import { CreationFields } from './CreationFields/CreationFields';
import { ObjectiveFields } from './ObjectiveFields/ObjectiveFields';
import { WrittenFields } from './WrittenFields/WrittenFields';

interface FormatFieldsProps {
  kind: ChallengeKind;
}

const formats = [
  { kind: ChallengeKind.Choice, Component: ObjectiveFields },
  { kind: ChallengeKind.Text, Component: WrittenFields },
  { kind: ChallengeKind.Build, Component: BuildFields },
  { kind: ChallengeKind.Create, Component: CreationFields },
];

export function FormatFields({ kind }: FormatFieldsProps) {
  return (
    <div>
      {formats.map(({ kind: value, Component }) => (
        <fieldset
          key={value}
          hidden={kind !== value}
          disabled={kind !== value}
          className="border-0 p-0 m-0 min-w-0 [&[hidden]]:hidden"
        >
          <Component />
        </fieldset>
      ))}
    </div>
  );
}
