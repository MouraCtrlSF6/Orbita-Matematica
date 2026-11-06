import { sectors } from '../../../../../content/sectors';
import type { SavedGame } from '../../../../../game/types';
import { SectorDiscoveries } from './SectorDiscoveries/SectorDiscoveries';

export interface SummarySectorsProps {
  save: SavedGame;
}

export function SummarySectors({ save }: SummarySectorsProps) {
  return (
    <div className="summary-sectors grid gap-5 [&_>_section]:p-[1.5625rem] [&_>_section]:[border:1px_solid_var(--line)] [&_>_section]:rounded-panel [&_>_section]:bg-white [&_h2]:text-control [&_ul]:[list-style:none] [&_ul]:p-0 [&_ul]:mt-[0.9375rem] [&_ul]:mr-0 [&_ul]:mb-0 [&_ul]:ml-0 [&_li]:[border-top:1px_solid_#eeedf2] [&_li]:py-[0.9375rem] [&_li]:px-0 [&_li]:flex [&_li]:gap-3 [&_li]:items-start [&_li]:text-[#86729f] [&_strong]:text-support [&_strong]:text-[#51475d] [&_strong]:block [&_li_span]:block [&_li_span]:text-label [&_li_span]:text-[#685b73] [&_li_span]:mt-[0.1875rem] [&_li_p]:text-small [&_li_p]:text-[#5d7163] [&_li_p]:mt-2">
      {sectors.map((sector) => (
        <SectorDiscoveries key={sector.id} sector={sector} save={save} />
      ))}
    </div>
  );
}
