import { missions } from '../../content/missions';
import type { Expedition } from './expedition';
interface ExpeditionViewProps {
  expedition: Expedition;
}
function ExpeditionTitle({ expedition }: ExpeditionViewProps) {
  const sector = expedition.sector;
  const eyebrow = sector
    ? `SETOR ${sector.number} · EXPLORAÇÃO LIVRE`
    : 'ÓRBITA MATEMÁTICA · EXPEDIÇÃO ESPACIAL';
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="exploration-title">{sector?.name ?? 'O universo espera por você.'}</h1>
      <p>{sector?.description ?? 'Pilote sua nave. Encontre novos mundos. Descubra a álgebra.'}</p>
    </div>
  );
}
export function ExpeditionHeader({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-heading">
      <ExpeditionTitle expedition={expedition} />
      <span className="exploration-count">
        {Object.keys(expedition.props.save.completed).length} / {missions.length} descobertas
      </span>
    </div>
  );
}
function TravelButton({ expedition }: ExpeditionViewProps) {
  if (expedition.sector)
    return (
      <button className="button flight-secondary" onClick={expedition.props.onUniverse}>
        ← Voltar ao universo
      </button>
    );
  return (
    <button className="button flight-primary" onClick={expedition.resume}>
      {expedition.resumeLabel}
    </button>
  );
}
export function ExpeditionToolbar({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-toolbar">
      <TravelButton expedition={expedition} />
      <button className="button flight-secondary" onClick={expedition.props.onTutorial}>
        Como pilotar e jogar
      </button>
      <button className="button flight-secondary" onClick={expedition.props.onSummary}>
        Ver descobertas
      </button>
    </div>
  );
}
function CompletionActions({ expedition }: ExpeditionViewProps) {
  if (!expedition.allComplete) return null;
  return (
    <button className="button flight-primary" onClick={expedition.props.onSummary}>
      Ver minhas descobertas
    </button>
  );
}
function completionMessage(expedition: Expedition): string {
  return expedition.nextSector
    ? `${expedition.nextSector.name} está disponível. Volte ao universo para viajar até lá.`
    : 'Você concluiu toda a expedição. Suas descobertas estão no diário.';
}
const completedSectorTitle = <strong>✦ Setor concluído!</strong>;
export function SectorCelebration({ expedition }: ExpeditionViewProps) {
  if (!expedition.sectorComplete) return null;
  return (
    <div className="sector-celebration" role="status">
      {completedSectorTitle}
      <p>{completionMessage(expedition)}</p>
      <CompletionActions expedition={expedition} />
    </div>
  );
}
