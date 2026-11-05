import { missions } from '../../../../content/missions';

function summaryTitle(count: number): string {
  return count === missions.length ? 'Um universo de descobertas!' : 'Cada passo conta.';
}

function summaryDescription(count: number): string {
  return count === missions.length
    ? 'Você concluiu os três setores. Pode revisitar qualquer missão e continuar experimentando.'
    : 'Aqui ficam suas missões concluídas e os caminhos que ajudaram você a aprender.';
}

export interface SummaryHeadingProps {
  count: number;
}

export function SummaryHeading({ count }: SummaryHeadingProps) {
  return (
    <>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SEU DIÁRIO DE BORDO
      </p>
      <h1>{summaryTitle(count)}</h1>
      <p>{summaryDescription(count)}</p>
    </>
  );
}
