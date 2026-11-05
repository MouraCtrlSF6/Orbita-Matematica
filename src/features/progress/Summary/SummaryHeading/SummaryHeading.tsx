import { useMissionCatalog } from '../../../../pages/students/hooks/useMissionCatalog';

function summaryTitle(count: number, total: number): string {
  if (total === 0) return 'Sua sala está sem questões.';
  return count === total ? 'Um universo de descobertas!' : 'Cada passo conta.';
}

function summaryDescription(count: number, total: number): string {
  if (total === 0) return 'As questões disponíveis são carregadas ao entrar na sala.';
  return count === total
    ? 'Você concluiu os três setores. Pode revisitar qualquer missão e continuar experimentando.'
    : 'Aqui ficam suas missões concluídas e os caminhos que ajudaram você a aprender.';
}

export interface SummaryHeadingProps {
  count: number;
}

export function SummaryHeading({ count }: SummaryHeadingProps) {
  const total = useMissionCatalog().length;

  return (
    <>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SEU DIÁRIO DE BORDO
      </p>
      <h1>{summaryTitle(count, total)}</h1>
      <p>{summaryDescription(count, total)}</p>
    </>
  );
}
