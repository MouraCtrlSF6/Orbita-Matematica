import type { Mission, SavedGame } from '../../../../../../../game/types';
import { MissionDiscovery } from './MissionDiscovery/MissionDiscovery';

export interface DiscoveryListProps {
  items: Mission[];
  save: SavedGame;
}

export function DiscoveryList({ items, save }: DiscoveryListProps) {
  return (
    <ul>
      {items.map((mission) => (
        <MissionDiscovery key={mission.id} mission={mission} result={save.completed[mission.id]} />
      ))}
    </ul>
  );
}
