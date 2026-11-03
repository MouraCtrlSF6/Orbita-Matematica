import { useMemo } from 'react';
import { SpaceFlight } from './SpaceFlight';
import { Expedition, mapWorld, type ExpeditionMapProps } from './expedition';
import { ExpeditionHeader, ExpeditionToolbar, SectorCelebration } from './ExpeditionHeader';
function ExpeditionFlight({ expedition }: { expedition: Expedition }) {
  const { save, positions, paused, onSoundChange } = expedition.props;
  return (
    <SpaceFlight
      key={expedition.mapKey}
      world={expedition.world}
      statuses={expedition.statuses}
      nextId={expedition.nextId}
      initialPosition={positions.get(expedition.mapKey)}
      reducedMotion={save.preferences.reducedMotion}
      soundEnabled={save.preferences.soundEnabled}
      onSoundChange={onSoundChange}
      paused={paused}
      onPosition={expedition.rememberPosition}
      onVisit={expedition.visit}
    />
  );
}
function ExpeditionJourney({ expedition }: { expedition: Expedition }) {
  return (
    <>
      <SectorCelebration expedition={expedition} />
      <ExpeditionFlight expedition={expedition} />
      <p className="exploration-note">
        O ritmo é seu. Sem perder vidas, com pistas em cada descoberta.
      </p>
    </>
  );
}
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
