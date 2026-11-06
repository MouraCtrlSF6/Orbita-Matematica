import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import type { ReactNode } from 'react';
import { Icon } from '../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../components/icon-names';
import type { TutorialPageProps } from '../../../tutorial-view';

export interface NextStepProps {
  onNext: TutorialPageProps['onNext'];
  children: ReactNode;
}

export function NextStep({ onNext, children }: NextStepProps) {
  return (
    <Button
      variant={ButtonVariant.Primary}

      onClick={onNext}
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      {children}
      <Icon name={IconName.Arrow} size={18} />
    </Button>
  );
}
