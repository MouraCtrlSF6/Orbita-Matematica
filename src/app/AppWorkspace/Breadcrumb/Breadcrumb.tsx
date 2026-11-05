import { Screen } from '../../../game/reducer';

const titles: Record<Screen, string> = {
  [Screen.Map]: 'Mapa do universo',
  [Screen.Sector]: 'Exploração do setor',
  [Screen.Summary]: 'Minhas descobertas',
  [Screen.Tutorial]: 'Como jogar',
  [Screen.Mission]: 'Missão em andamento',
};

export interface BreadcrumbProps {
  screen: Screen;
}

export function Breadcrumb({ screen }: BreadcrumbProps) {
  return (
    <div className="breadcrumb flex gap-[0.9375rem] items-center text-label [&_>_span:first-child]:text-eyebrow [&_>_span:first-child]:tracking-[0.10625rem] [&_>_span:first-child]:text-[#626575] [&_>_span:nth-child(2)]:text-[#c9cbd3] [&_strong]:font-medium [&_strong]:text-[#555a68] ds-down-mobile:text-caption ds-down-mobile:gap-2.5 ds-down-mobile:[&_>_span:first-child]:text-micro [.exploration-shell_&_strong]:text-[#bdc7e2] [.exploration-shell_&_>_span:first-child]:text-[#bdc7e2]">
      <span>EXPEDIÇÃO</span>
      <span>/</span>
      <strong>{titles[screen]}</strong>
    </div>
  );
}
