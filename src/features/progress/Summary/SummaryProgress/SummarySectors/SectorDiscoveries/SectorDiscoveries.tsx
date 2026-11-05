import { missions } from '../../../../../../content/missions';
import type { SavedGame, Sector } from '../../../../../../game/types';
import { DiscoveryList } from './DiscoveryList/DiscoveryList';

export interface SectorDiscoveriesProps {
  sector: Sector;
  save: SavedGame;
}

export function SectorDiscoveries({ sector, save }: SectorDiscoveriesProps) {
  const items = missions.filter((item) => item.sectorId === sector.id);

  return (
    <section>
      <h2>{sector.name}</h2>
      <DiscoveryList items={items} save={save} />
    </section>
  );
}
