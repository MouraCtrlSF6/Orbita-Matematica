import { type ExpeditionViewProps } from './expedition-header-types';

export function ExpeditionTitle({ expedition }: ExpeditionViewProps) {
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
