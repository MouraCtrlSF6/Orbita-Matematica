import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';
import type { FlightViewProps } from '../../../../flight-scene-types';
import type { ControlKey } from '../../../flight-panels-types';

export interface FlightControlProps {
  control: ControlKey;
  controller: FlightViewProps['controller'];
  paused?: boolean;
}

export function FlightControl({
  control: { key, symbol, label },
  controller,
  paused,
}: FlightControlProps) {
  return (
    <Button
      variant={ButtonVariant.FlightSecondary}
      aria-label={label}
      disabled={paused}
      className="p-0 font-normal"
      onPointerDown={(event) => controller.pointerDown(key, event)}
      onPointerUp={controller.stop}
      onPointerCancel={controller.stop}
      onLostPointerCapture={controller.stop}
      onBlur={controller.stop}
      onKeyDown={(event) => controller.controlKeyDown(key, event)}
      onKeyUp={controller.stop}
    >
      {symbol}
    </Button>
  );
}
