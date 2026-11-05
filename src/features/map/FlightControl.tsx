import type { FlightViewProps } from './flight-scene-types';

export interface FlightControlProps {
  control: string[];
  controller: FlightViewProps['controller'];
  paused?: boolean;
}

export function FlightControl({
  control: [key, symbol, label],
  controller,
  paused,
}: FlightControlProps) {
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
