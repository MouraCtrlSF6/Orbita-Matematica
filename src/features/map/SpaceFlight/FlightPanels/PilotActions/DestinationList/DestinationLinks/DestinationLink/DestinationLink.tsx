import { Button } from '../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../components/Button/button-styles';
import type { SpaceDestination } from '../../../../../../../../game/space';
import type { FlightViewProps } from '../../../../../flight-scene-types';

export interface DestinationLinkProps {
  destination: SpaceDestination;
  status?: FlightViewProps['statuses'][string];
  controller: FlightViewProps['controller'];
  paused?: boolean;
}

export function DestinationLink({ destination, status, controller, paused }: DestinationLinkProps) {
  return (
    <Button
      variant={ButtonVariant.FlightSecondary}
      disabled={!status?.unlocked || paused}
      className="font-normal"
      onClick={() => controller.visitDirect(destination.id)}
    >
      <span>{destination.label}</span>
      <small>{status?.detail}</small>
    </Button>
  );
}
