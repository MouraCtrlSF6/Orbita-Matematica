import { ChallengeKind, type Mission } from '../../../../../../../game/types';
import type { AnswerControlProps } from './answer-control';
import { BuildAnswer } from './BuildAnswer/BuildAnswer';
import { ChoiceAnswer } from './ChoiceAnswer/ChoiceAnswer';
import { NumberAnswer } from './NumberAnswer/NumberAnswer';
import { TextAnswer } from './TextAnswer/TextAnswer';

export interface AnswerInputProps extends AnswerControlProps {
  mission: Mission;
}

const formats = {
  [ChallengeKind.Choice]: ChoiceAnswer,
  [ChallengeKind.Build]: BuildAnswer,
  [ChallengeKind.Number]: NumberAnswer,
  [ChallengeKind.Text]: TextAnswer,
  [ChallengeKind.Create]: NumberAnswer,
};

export function AnswerInput({ mission, ...controls }: AnswerInputProps) {
  const Format = formats[mission.kind];

  return <Format choices={mission.choices} tokens={mission.tokens} {...controls} />;
}
