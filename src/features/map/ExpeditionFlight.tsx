import { SpaceFlight } from './SpaceFlight';
import { Expedition } from './expedition';

export interface ExpeditionFlightProps {
  expedition: Expedition;
}

export function ExpeditionFlight({ expedition }: ExpeditionFlightProps) {
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
