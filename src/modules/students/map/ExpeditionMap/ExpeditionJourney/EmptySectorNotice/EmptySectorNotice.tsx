import { useExpedition } from '../../hooks/useExpedition';

export function EmptySectorNotice() {
  const expedition = useExpedition();

  if (!expedition.sector || expedition.world.destinations.length > 0) return null;
  return (
    <p role="status">
      Este setor está sem questões nesta sala. Você pode continuar a exploração pelo universo.
    </p>
  );
}
