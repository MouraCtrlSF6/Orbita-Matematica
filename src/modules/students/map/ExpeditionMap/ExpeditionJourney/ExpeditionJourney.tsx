import { EmptySectorNotice } from './EmptySectorNotice/EmptySectorNotice';
import { SectorCelebration } from './SectorCelebration/SectorCelebration';
import { ExpeditionFlight } from './ExpeditionFlight/ExpeditionFlight';

export function ExpeditionJourney() {
  return (
    <>
      <EmptySectorNotice />
      <SectorCelebration />
      <ExpeditionFlight />
      <p className="exploration-note text-[#afbed8] text-small text-center pt-4.5">
        O ritmo é seu. Sem perder vidas, com pistas em cada descoberta.
      </p>
    </>
  );
}
