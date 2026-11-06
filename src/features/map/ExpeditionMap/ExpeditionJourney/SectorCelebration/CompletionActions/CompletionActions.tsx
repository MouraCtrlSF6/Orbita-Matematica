import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import { type ExpeditionViewProps } from '../../../expedition-header-types';

export function CompletionActions({ expedition }: ExpeditionViewProps) {
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
