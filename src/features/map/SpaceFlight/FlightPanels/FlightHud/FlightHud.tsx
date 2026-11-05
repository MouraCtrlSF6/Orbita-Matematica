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
      <button
        className="button flight-primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-primary:bg-flight-primary ds-flight-primary:text-flight-primary-ink ds-flight-primary:ds-hover:bg-flight-primary-hover ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        disabled={disabled}
        onClick={props.controller.visit}
      >
        Entrar
      </button>
    </div>
  );
}
