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
    <div
      className="flight-contact [&_strong]:block [&_span]:block [&_strong]:text-body [&_span]:text-[#c0cbe2] [&_span]:text-small [&_span]:mt-[0.1875rem] ds-down-mobile:min-w-0"
      role="status"
    >
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
function FlightGuidance({ world, nextId }: FlightViewProps) {
  const target = world.destinations.find((item) => item.id === nextId);
  if (!target) return null;
  return (
    <p
      className="flight-guidance text-small py-2.5 px-4.5 text-[#c8ffe9] flex items-center gap-2.5 [&_>_span]:inline-block [&_>_span]:text-challenge-compact ds-down-mobile:py-2.5 ds-down-mobile:px-3"
      role="status"
    >
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
    <div
      className="flight-touch flex justify-center gap-2.5 pt-[0.4375rem] pr-4.5 pb-3.5 pl-4.5 [&_button]:w-12 [&_button]:h-11 [&_button]:rounded-option [&_button]:[border:1px_solid_#7786a3] [&_button]:[background:#202e4a] [&_button]:text-white [&_button]:text-formula [&_button]:[touch-action:none] [&_button]:[user-select:none] [&_button:active]:[background:#405579]"
      aria-label="Controles de pilotagem por toque"
    >
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
    <details
      className="flight-destinations [border-top:1px_solid_#34425f] py-3.5 px-4.5 [&_summary]:cursor-pointer [&_summary]:text-support [&_summary]:text-[#d7c7ff] [&_summary]:min-h-7.5 [&_p]:text-small [&_p]:text-[#bdcae0] [&_p]:mt-1.5 [&_p]:mr-0 [&_p]:mb-3 [&_p]:ml-0 [&_ol]:grid [&_ol]:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_15rem),_1fr))] [&_ol]:gap-2.5 [&_ol]:pl-0 [&_li]:ml-6 [&_li]:min-w-0 [&_li]:pl-[0.1875rem] [&_li]:text-[#c1cde5] [&_li]:text-small [&_button]:block [&_button]:w-full [&_button]:text-left [&_button]:p-3 [&_button]:[border:1px_solid_#657795] [&_button]:[background:#1b2944] [&_button]:text-flight-ink [&_button]:rounded-control [&_button:disabled]:[background:#141d31] [&_button:disabled]:text-[#a9b6d0] [&_button:disabled]:[border-color:#3b4962] [&_button_span]:block [&_button_small]:block [&_button_small]:text-label [&_button_small]:mt-[0.3125rem] [.tutorial-pilot_&]:hidden ds-down-mobile:p-3"
      onToggle={props.controller.stop}
    >
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
