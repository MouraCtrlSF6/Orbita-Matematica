import type { FlightViewProps } from '../../../flight-scene-types';
import { DestinationLinks } from './DestinationLinks/DestinationLinks';

interface DestinationListProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
}

export function DestinationList(props: DestinationListProps) {
  return (
    <details
      className="flight-destinations [border-top:1px_solid_#34425f] py-3.5 px-4.5 [&_summary]:cursor-pointer [&_summary]:text-support [&_summary]:text-[#d7c7ff] [&_summary]:min-h-7.5 [&_p]:text-small [&_p]:text-[#bdcae0] [&_p]:mt-1.5 [&_p]:mr-0 [&_p]:mb-3 [&_p]:ml-0 [&_ol]:grid [&_ol]:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_15rem),_1fr))] [&_ol]:gap-2.5 [&_ol]:pl-0 [&_li]:ml-6 [&_li]:min-w-0 [&_li]:pl-[0.1875rem] [&_li]:text-[#c1cde5] [&_li]:text-small [&_button]:block [&_button]:w-full [&_button]:text-left [&_button]:p-3 [&_button]:[border:1px_solid_#657795] [&_button]:[background:#1b2944] [&_button]:text-flight-ink [&_button]:rounded-control [&_button:disabled]:[background:#141d31] [&_button:disabled]:text-[#a9b6d0] [&_button:disabled]:[border-color:#3b4962] [&_button_span]:block [&_button_small]:block [&_button_small]:text-label [&_button_small]:mt-[0.3125rem] ds-down-mobile:p-3"
      onToggle={props.controller.stop}
    >
      <summary>Destinos em lista</summary>
      <p>Você também pode visitar os destinos diretamente pelos botões.</p>
      <DestinationLinks {...props} />
    </details>
  );
}
