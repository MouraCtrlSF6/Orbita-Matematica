import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import type { TutorialPageProps } from './tutorial-view';

interface FinishTutorialProps {
  answer: TutorialPageProps['answer'];
  onFinish: TutorialPageProps['onFinish'];
}

export function FinishTutorial({ answer, onFinish }: FinishTutorialProps) {
  return (
    <button
      className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      disabled={answer !== '4'}
      onClick={onFinish}
    >
      Pronto para explorar
      <Icon name={IconName.Rocket} size={18} />
    </button>
  );
}
