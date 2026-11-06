import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import { Icon } from '../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../components/icon-names';
import { type MissionGuideProps } from '../mission-guide-types';

function hintLabel(openHints: number, limit: number): string {
  if (!openHints) return 'Quero uma pista';
  return openHints < limit ? 'Próximo passo' : 'Todas as dicas abertas';
}

export function HintButton({ hints, openHints, done, onHint }: MissionGuideProps) {
  return (
    <Button
      variant={ButtonVariant.Secondary}
      className="hint-button [border:1px_solid_#d8cce6] bg-white text-[#71558d] w-full mt-5 mr-0 mb-0 ml-0 ds-hover:[background:#f8f5fd] ds-down-tablet:max-w-80 ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem]"
      disabled={openHints >= hints.length || done}
      onClick={onHint}
    >
      <Icon name={IconName.Bulb} size={19} />
      {hintLabel(openHints, hints.length)}
    </Button>
  );
}
