import { useExpedition } from '../../../hooks/useExpedition';
import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';

export function CompletionActions() {
  const expedition = useExpedition();

  if (!expedition.allComplete) return null;
  return (
    <Button
      variant={ButtonVariant.FlightPrimary}

      onClick={expedition.props.onSummary}
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem]"
    >
      Ver minhas descobertas
    </Button>
  );
}
