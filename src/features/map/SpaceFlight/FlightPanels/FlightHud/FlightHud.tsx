import { Button } from '../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
import type { SpaceDestination } from '../../../../../game/space';
import { type FlightPanelsProps } from '../flight-panels-types';
import { FlightContact } from './FlightContact/FlightContact';

interface FlightHudProps {
  world: FlightPanelsProps['world'];
  statuses: FlightPanelsProps['statuses'];
  controller: FlightPanelsProps['controller'];
  nearId?: string;
  paused?: boolean;
}

function visitDisabled(
  near: SpaceDestination | undefined,
  statuses: FlightHudProps['statuses'],
  paused?: boolean,
) {
  return !near || !statuses[near.id]?.unlocked || paused;
}

export function FlightHud(props: FlightHudProps) {
  const near = props.world.destinations.find((item) => item.id === props.nearId);

  const disabled = visitDisabled(near, props.statuses, props.paused);

  return (
    <div className="flight-hud flex items-center justify-between gap-4 py-4 px-4.5 [border-top:1px_solid_#3a4565] [background:#141d36] ds-down-mobile:p-3">
      <FlightContact near={near} statuses={props.statuses} />
      <Button
        variant={ButtonVariant.FlightPrimary}

        disabled={disabled}
        onClick={props.controller.visit}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      >
        Entrar
      </Button>
    </div>
  );
}
