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
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        {eyebrow}
      </p>
      <h1 id="exploration-title">{sector?.name ?? 'O universo espera por você.'}</h1>
      <p>{sector?.description ?? 'Pilote sua nave. Encontre novos mundos. Descubra a álgebra.'}</p>
    </div>
  );
}
export function ExpeditionHeader({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-heading flex justify-between items-center gap-5 [&_h1]:text-exploration-title [&_h1]:tracking-[-0.04em] [&_p:not(.eyebrow)]:text-[#bac8df] [&_p:not(.eyebrow)]:mt-[0.5625rem] [&_p:not(.eyebrow)]:text-body ds-down-mobile:items-start ds-down-mobile:flex-col ds-down-mobile:gap-3.5">
      <ExpeditionTitle expedition={expedition} />
      <span className="exploration-count text-[#b7fbe4] [border:1px_solid_#365969] [background:#122835] rounded-status py-2.5 px-[0.9375rem] text-small whitespace-nowrap">
        {Object.keys(expedition.props.save.completed).length} / {missions.length} descobertas
      </span>
    </div>
  );
}
function TravelButton({ expedition }: ExpeditionViewProps) {
  if (expedition.sector)
    return (
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onUniverse}
      >
        ← Voltar ao universo
      </button>
    );
  return (
    <button
      className="button flight-primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-primary:bg-flight-primary ds-flight-primary:text-flight-primary-ink ds-flight-primary:ds-hover:bg-flight-primary-hover ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      onClick={expedition.resume}
    >
      {expedition.resumeLabel}
    </button>
  );
}
export function ExpeditionToolbar({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-toolbar flex flex-wrap gap-2.5 mt-5.5 mr-0 mb-4 ml-0 [&_button:focus-visible]:[outline-color:var(--color-flight-focus)]">
      <TravelButton expedition={expedition} />
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onTutorial}
      >
        Como pilotar e jogar
      </button>
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onSummary}
      >
        Ver descobertas
      </button>
    </div>
  );
}
function CompletionActions({ expedition }: ExpeditionViewProps) {
  if (!expedition.allComplete) return null;
  return (
    <button
      className="button flight-primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-primary:bg-flight-primary ds-flight-primary:text-flight-primary-ink ds-flight-primary:ds-hover:bg-flight-primary-hover ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      onClick={expedition.props.onSummary}
    >
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
    <div
      className="sector-celebration [background:#14352e] [border:1px_solid_#83ddbd] text-[#dbfff0] p-4 rounded-tile mb-4 [&_p]:my-[0.3125rem] [&_p]:mx-0 [&_p]:text-support"
      role="status"
    >
      {completedSectorTitle}
      <p>{completionMessage(expedition)}</p>
      <CompletionActions expedition={expedition} />
    </div>
  );
}
