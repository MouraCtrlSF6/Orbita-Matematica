import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import type { FlightViewProps } from '../../../flight-scene-types';
import type { ControlKey } from '../../flight-panels-types';
import { FlightControl } from './FlightControl/FlightControl';

const controls: ControlKey[] = [
  {
    key: 'ArrowLeft',
    symbol: <ArrowLeftIcon className="size-5" />,
    label: 'Mover para a esquerda',
  },
  {
    key: 'ArrowUp',
    symbol: <ArrowUpIcon className="size-5" />,
    label: 'Mover para cima',
  },
  {
    key: 'ArrowDown',
    symbol: <ArrowDownIcon className="size-5" />,
    label: 'Mover para baixo',
  },
  {
    key: 'ArrowRight',
    symbol: <ArrowRightIcon className="size-5" />,
    label: 'Mover para a direita',
  },
];

interface FlightControlsProps {
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
}

export function FlightControls({ controller, paused }: FlightControlsProps) {
  return (
    <div
      className="flight-touch flex justify-center gap-2.5 pt-1.75 pr-4.5 pb-3.5 pl-4.5 [&_button]:w-12 [&_button]:h-11 [&_button]:rounded-option [&_button]:[border:1px_solid_#7786a3] [&_button]:[background:#202e4a] [&_button]:text-white [&_button]:text-formula [&_button]:[touch-action:none] [&_button]:[user-select:none] [&_button:active]:[background:#405579]"
      aria-label="Controles de pilotagem por toque"
    >
      {controls.map((control) => (
        <FlightControl
          key={control.key}
          control={control}
          controller={controller}
          paused={paused}
        />
      ))}
    </div>
  );
}
