import { useExpedition } from '../../hooks/useExpedition';
import { SpaceFlight } from '../../../SpaceFlight/SpaceFlight';

export function ExpeditionFlight() {
  const expedition = useExpedition();

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
