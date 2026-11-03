import type { SpaceDestination } from '../../game/space';
import type { FlightViewProps } from './FlightScene';
interface FlightPanelsProps extends FlightViewProps {
  nearId?: string;
}
function FlightContact({
  near,
  statuses,
}: {
  near?: SpaceDestination;
  statuses: FlightViewProps['statuses'];
}) {
  const detail = near ? statuses[near.id]?.detail : 'Aproxime-se de um destino destacado.';
  return (
    <div className="flight-contact" role="status">
      <strong>{near?.label ?? 'Explore o espaço'}</strong>
      <span>{detail}</span>
    </div>
  );
}
function visitDisabled(near: SpaceDestination | undefined, props: FlightPanelsProps) {
  return !near || !props.statuses[near.id]?.unlocked || props.paused;
}
function FlightHud(props: FlightPanelsProps) {
  const near = props.world.destinations.find((item) => item.id === props.nearId);
  const disabled = visitDisabled(near, props);
  return (
    <div className="flight-hud">
      <FlightContact near={near} statuses={props.statuses} />
      <button
        className="button flight-primary"
        disabled={disabled}
        onClick={props.controller.visit}
      >
        Entrar
      </button>
    </div>
  );
}
function FlightGuidance({ world, nextId }: FlightViewProps) {
  const target = world.destinations.find((item) => item.id === nextId);
  if (!target) return null;
  return (
    <p className="flight-guidance" role="status">
      <span aria-hidden="true">➜</span> Próximo destino: {target.label}
    </p>
  );
}
const controls = [
  ['ArrowUp', '↑', 'Mover para cima'],
  ['ArrowLeft', '←', 'Mover para a esquerda'],
  ['ArrowDown', '↓', 'Mover para baixo'],
  ['ArrowRight', '→', 'Mover para a direita'],
];
interface FlightControlProps {
  control: string[];
  controller: FlightViewProps['controller'];
  paused?: boolean;
}
function FlightControl({ control: [key, symbol, label], controller, paused }: FlightControlProps) {
  return (
    <button
      aria-label={label}
      disabled={paused}
      onPointerDown={(event) => controller.pointerDown(key, event)}
      onPointerUp={controller.stop}
      onPointerCancel={controller.stop}
      onLostPointerCapture={controller.stop}
      onBlur={controller.stop}
      onKeyDown={(event) => controller.controlKeyDown(key, event)}
      onKeyUp={controller.stop}
    >
      {symbol}
    </button>
  );
}
function FlightControls({ controller, paused }: FlightViewProps) {
  return (
    <div className="flight-touch" aria-label="Controles de pilotagem por toque">
      {controls.map((control) => (
        <FlightControl key={control[0]} control={control} controller={controller} paused={paused} />
      ))}
    </div>
  );
}
interface DestinationLinkProps {
  destination: SpaceDestination;
  status?: FlightViewProps['statuses'][string];
  controller: FlightViewProps['controller'];
  paused?: boolean;
}
function DestinationLink({ destination, status, controller, paused }: DestinationLinkProps) {
  return (
    <button
      disabled={!status?.unlocked || paused}
      onClick={() => controller.visitDirect(destination.id)}
    >
      <span>{destination.label}</span>
      <small>{status?.detail}</small>
    </button>
  );
}
function DestinationLinks({ world, statuses, controller, paused }: FlightViewProps) {
  return (
    <ol>
      {world.destinations.map((destination) => (
        <li key={destination.id}>
          <DestinationLink
            destination={destination}
            status={statuses[destination.id]}
            controller={controller}
            paused={paused}
          />
        </li>
      ))}
    </ol>
  );
}
function DestinationList(props: FlightViewProps) {
  return (
    <details className="flight-destinations" onToggle={props.controller.stop}>
      <summary>Destinos em lista</summary>
      <p>Você também pode visitar os destinos diretamente pelos botões.</p>
      <DestinationLinks {...props} />
    </details>
  );
}
function PilotActions(props: FlightViewProps) {
  return (
    <>
      <FlightControls {...props} />
      <DestinationList {...props} />
    </>
  );
}
export function FlightPanels(props: FlightPanelsProps) {
  return (
    <>
      <FlightHud {...props} />
      <FlightGuidance {...props} />
      <PilotActions {...props} />
    </>
  );
}
