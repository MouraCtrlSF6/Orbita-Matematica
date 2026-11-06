import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';
import { type ExpeditionViewProps } from '../expedition-header-types';
import { TravelButton } from './TravelButton/TravelButton';

export function ExpeditionToolbar({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-toolbar flex flex-wrap gap-2.5 mt-5.5 mr-0 mb-4 ml-0 [&_button:focus-visible]:[outline-color:var(--color-flight-focus)]">
      <TravelButton expedition={expedition} />
      <Button
        variant={ButtonVariant.FlightSecondary}

        onClick={expedition.props.onSummary}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem]"
      >
        Ver descobertas
      </Button>
    </div>
  );
}
