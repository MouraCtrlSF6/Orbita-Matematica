import { EmptySectorNotice } from './EmptySectorNotice/EmptySectorNotice';
import { Expedition } from '../expedition';
import { SectorCelebration } from './SectorCelebration/SectorCelebration';
import { ExpeditionFlight } from './ExpeditionFlight/ExpeditionFlight';

export interface ExpeditionJourneyProps {
  expedition: Expedition;
}

export function ExpeditionJourney({ expedition }: ExpeditionJourneyProps) {
  return (
    <>
      <EmptySectorNotice expedition={expedition} />
      <SectorCelebration expedition={expedition} />
      <ExpeditionFlight expedition={expedition} />
      <p className="exploration-note text-[#afbed8] text-small text-center pt-4.5">
        O ritmo é seu. Sem perder vidas, com pistas em cada descoberta.
      </p>
    </>
  );
}
