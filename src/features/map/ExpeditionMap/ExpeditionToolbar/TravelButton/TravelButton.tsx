import { Button } from '../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
import { type ExpeditionViewProps } from '../../expedition-header-types';

export function TravelButton({ expedition }: ExpeditionViewProps) {
  if (expedition.sector)
    return (
      <Button
        variant={ButtonVariant.FlightSecondary}

        onClick={expedition.props.onUniverse}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      >
        ← Voltar ao universo
      </Button>
    );
  return (
    <Button
      variant={ButtonVariant.FlightPrimary}

      onClick={expedition.resume}
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      {expedition.resumeLabel}
    </Button>
  );
}
