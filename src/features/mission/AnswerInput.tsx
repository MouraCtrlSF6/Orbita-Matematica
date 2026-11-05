import { ChallengeKind, type Mission } from '../../game/types';
import type { AnswerControlProps } from './answer-control';
import { BuildAnswer } from './BuildAnswer';
import { ChoiceAnswer } from './ChoiceAnswer';
import { NumberAnswer } from './NumberAnswer';

export interface AnswerInputProps extends AnswerControlProps {
  mission: Mission;
}

const formats = {
  [ChallengeKind.Choice]: ChoiceAnswer,
  [ChallengeKind.Build]: BuildAnswer,
  [ChallengeKind.Number]: NumberAnswer,
  [ChallengeKind.Create]: NumberAnswer,
};

export function AnswerInput({ mission, ...controls }: AnswerInputProps) {
  const Format = formats[mission.kind];

  return <Format choices={mission.choices} tokens={mission.tokens} {...controls} />;
}
