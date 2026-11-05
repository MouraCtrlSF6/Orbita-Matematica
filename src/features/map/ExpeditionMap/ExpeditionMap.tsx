import { useMemo } from 'react';
import { Expedition, mapWorld, type ExpeditionMapProps } from './expedition';
import { ExpeditionHeader } from './ExpeditionHeader/ExpeditionHeader';
import { ExpeditionToolbar } from './ExpeditionToolbar/ExpeditionToolbar';
import { ExpeditionJourney } from './ExpeditionJourney/ExpeditionJourney';

export function ExpeditionMap(props: ExpeditionMapProps) {
  const world = useMemo(() => mapWorld(props.sectorId), [props.sectorId]);

  const expedition = new Expedition(props, world);

  return (
    <section className="exploration-screen" aria-labelledby="exploration-title">
      <ExpeditionHeader expedition={expedition} />
      <ExpeditionToolbar expedition={expedition} />
      <ExpeditionJourney expedition={expedition} />
    </section>
  );
}
