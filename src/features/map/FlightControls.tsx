import type { FlightViewProps } from './flight-scene-types';
import { FlightControl } from './FlightControl';

const controls = [
  ['ArrowUp', '↑', 'Mover para cima'],
  ['ArrowLeft', '←', 'Mover para a esquerda'],
  ['ArrowDown', '↓', 'Mover para baixo'],
  ['ArrowRight', '→', 'Mover para a direita'],
];

interface FlightControlsProps {
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
}

export function FlightControls({ controller, paused }: FlightControlsProps) {
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
