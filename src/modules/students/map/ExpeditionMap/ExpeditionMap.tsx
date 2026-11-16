import { ExpeditionContext } from './contexts/expedition-context';
import { useMissionCatalog } from '../../session/hooks/useMissionCatalog';
import { useMemo } from 'react';
import { Expedition, mapWorld, type ExpeditionMapProps } from './expedition';
import { ExpeditionHeader } from './ExpeditionHeader/ExpeditionHeader';
import { ExpeditionToolbar } from './ExpeditionToolbar/ExpeditionToolbar';
import { ExpeditionJourney } from './ExpeditionJourney/ExpeditionJourney';

const expeditionContent = (
  <section className="exploration-screen" aria-labelledby="exploration-title">
    <ExpeditionHeader />
    <ExpeditionToolbar />
    <ExpeditionJourney />
  </section>
);

export function ExpeditionMap(props: ExpeditionMapProps) {
  const catalog = useMissionCatalog();

  const world = useMemo(() => mapWorld(props.sectorId, catalog), [props.sectorId, catalog]);

  const expedition = new Expedition(props, world, catalog);

  return <ExpeditionContext value={expedition}>{expeditionContent}</ExpeditionContext>;
}
