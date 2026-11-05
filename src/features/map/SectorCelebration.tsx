import type { Expedition } from './expedition';
import { type ExpeditionViewProps } from './expedition-header-types';
import { CompletionActions } from './CompletionActions';

function completionMessage(expedition: Expedition): string {
  return expedition.nextSector
    ? `${expedition.nextSector.name} está disponível. Volte ao universo para viajar até lá.`
    : 'Você concluiu toda a expedição. Suas descobertas estão no diário.';
}

const completedSectorTitle = <strong>✦ Setor concluído!</strong>;

export function SectorCelebration({ expedition }: ExpeditionViewProps) {
  if (!expedition.sectorComplete) return null;
  return (
    <div
      className="sector-celebration [background:#14352e] [border:1px_solid_#83ddbd] text-[#dbfff0] p-4 rounded-tile mb-4 [&_p]:my-[0.3125rem] [&_p]:mx-0 [&_p]:text-support"
      role="status"
    >
      {completedSectorTitle}
      <p>{completionMessage(expedition)}</p>
      <CompletionActions expedition={expedition} />
    </div>
  );
}
