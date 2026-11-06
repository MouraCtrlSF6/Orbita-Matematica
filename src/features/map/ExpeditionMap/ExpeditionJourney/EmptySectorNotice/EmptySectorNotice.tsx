import type { ExpeditionViewProps } from '../../expedition-header-types';

export function EmptySectorNotice({ expedition }: ExpeditionViewProps) {
  if (!expedition.sector || expedition.world.destinations.length > 0) return null;
  return (
    <p role="status">
      Este setor está sem questões nesta sala. Você pode continuar a exploração pelo universo.
    </p>
  );
}
