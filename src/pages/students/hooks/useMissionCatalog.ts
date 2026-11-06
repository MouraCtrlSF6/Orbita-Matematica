import { useContext } from 'react';
import { MissionCatalogContext } from '../contexts/mission-catalog-context';

export function useMissionCatalog() {
  return useContext(MissionCatalogContext);
}
