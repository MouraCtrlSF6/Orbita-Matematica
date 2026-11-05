import { Icon } from '../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../components/icon-names';
import { useMissionContext } from '../../../../hooks/useMissionContext';

export function SubmitAnswer() {
  const { session } = useMissionContext();

  if (session.done) return null;
  return (
    <button
      type="submit"
      className="button primary answer-submit min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] mt-4.5 [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      disabled={!session.answer.trim()}
    >
      Conferir resposta
      <Icon name={IconName.Arrow} size={18} />
    </button>
  );
}
