import type { Choice } from '../../../../../../../../../../game/types';
import { missionChoiceLabel } from '../../../../../../../utils/mission-choice-label';

export interface ChoiceLabelProps {
  choice: Choice;
  index: number;
}

export function ChoiceLabel({ choice, index }: ChoiceLabelProps) {
  return (
    <>
      <span
        className="option-letter text-caption text-[#82778e] ds-large-text:text-primary-hover [border:1px_solid_#e3dce9] rounded-xs py-0.5 px-1.5"
        aria-hidden="true"
      >
        {missionChoiceLabel(index)}
      </span>
      <span>{choice.label}</span>
    </>
  );
}
