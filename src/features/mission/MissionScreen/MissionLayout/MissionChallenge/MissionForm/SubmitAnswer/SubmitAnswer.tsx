import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';
import { Icon } from '../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../components/icon-names';
import { useMissionContext } from '../../../../hooks/useMissionContext';

export function SubmitAnswer() {
  const { session } = useMissionContext();

  if (session.done) return null;
  return (
    <Button
      variant={ButtonVariant.Primary}
      type="submit"
      className="answer-submit mt-4.5 ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem]"
      disabled={!session.answer.trim()}
    >
      Conferir resposta
      <Icon name={IconName.Arrow} size={18} />
    </Button>
  );
}
