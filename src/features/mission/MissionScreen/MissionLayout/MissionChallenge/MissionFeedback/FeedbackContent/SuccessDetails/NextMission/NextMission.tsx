import { Button } from '../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
import { Icon } from '../../../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../../../components/icon-names';

export interface NextMissionProps {
  onNext: () => void;
}

export function NextMission({ onNext }: NextMissionProps) {
  return (
    <Button
      variant={ButtonVariant.Primary}

      onClick={onNext}
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      Continuar exploração
      <Icon name={IconName.Arrow} size={18} />
    </Button>
  );
}
