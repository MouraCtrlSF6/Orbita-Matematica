import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';
import { Icon } from '../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../components/icon-names';
import type { TutorialPageProps } from '../../../../tutorial-view';

interface FinishTutorialProps {
  answer: TutorialPageProps['answer'];
  onFinish: TutorialPageProps['onFinish'];
}

export function FinishTutorial({ answer, onFinish }: FinishTutorialProps) {
  return (
    <Button
      variant={ButtonVariant.Primary}

      disabled={answer !== '4'}
      onClick={onFinish}
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      Pronto para explorar
      <Icon name={IconName.Rocket} size={18} />
    </Button>
  );
}
