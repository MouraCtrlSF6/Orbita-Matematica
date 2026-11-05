import type { ReactNode } from 'react';
import { Icon } from '../components/Icon';
import { IconName } from '../components/icon-names';
import { Screen } from '../game/reducer';
const titles: Record<Screen, string> = {
  [Screen.Map]: 'Mapa do universo',
  [Screen.Sector]: 'Exploração do setor',
  [Screen.Summary]: 'Minhas descobertas',
  [Screen.Tutorial]: 'Como jogar',
  [Screen.Mission]: 'Missão em andamento',
};
function Breadcrumb({ screen }: { screen: Screen }) {
  return (
    <div className="breadcrumb flex gap-[0.9375rem] items-center text-label [&_>_span:first-child]:text-eyebrow [&_>_span:first-child]:tracking-[0.10625rem] [&_>_span:first-child]:text-[#626575] [&_>_span:nth-child(2)]:text-[#c9cbd3] [&_strong]:font-medium [&_strong]:text-[#555a68] ds-down-mobile:text-caption ds-down-mobile:gap-2.5 ds-down-mobile:[&_>_span:first-child]:text-micro [.exploration-shell_&_strong]:text-[#bdc7e2] [.exploration-shell_&_>_span:first-child]:text-[#bdc7e2]">
      <span>EXPEDIÇÃO</span>
      <span>/</span>
      <strong>{titles[screen]}</strong>
    </div>
  );
}
const topbarRight = (
  <div className="topbar-right flex items-center gap-6.5">
    <span className="learning-label text-micro font-semibold tracking-[0.0625rem] text-[#626575] flex items-center gap-2 ds-down-tablet:hidden [.exploration-shell_&]:text-[#aebbd5]">
      <span className="live-dot w-1.5 h-1.5 rounded-full [background:#aee0c8] inline-block shrink-0 [.pill_&]:w-1 [.pill_&]:h-1" />{' '}
      APRENDER. EXPLORAR. DESCOBRIR.
    </span>
    <span
      className="explorer-avatar w-9 h-9 [background:#eee9f7] text-[#8471b6] rounded-full grid place-items-center [border:0.1875rem_solid_var(--color-white)] [box-shadow:0_0_0_0.0625rem_#e4dfeb] ds-down-mobile:w-7 ds-down-mobile:h-7 ds-down-mobile:[&_svg]:w-4 [.exploration-shell_&]:[background:#202c4a] [.exploration-shell_&]:[border-color:#354466] [.exploration-shell_&]:text-[#8cf7d9]"
      role="img"
      aria-label="Explorador"
    >
      <Icon name={IconName.Rocket} size={22} />
    </span>
  </div>
);
export function AppWorkspace({ screen, children }: { screen: Screen; children: ReactNode }) {
  return (
    <div className="workspace ml-60 min-w-0 [width:calc(100%_-_15rem)] ds-down-desktop:ml-52 ds-down-desktop:[width:calc(100%_-_13rem)] ds-down-tablet:ml-[11.5625rem] ds-down-tablet:[width:calc(100%_-_11.5625rem)] ds-down-mobile:m-0 ds-down-mobile:w-full">
      <header className="topbar h-[5.1875rem] [border-bottom:1px_solid_var(--line)] flex justify-between items-center py-0 px-11 bg-white ds-down-desktop:py-0 ds-down-desktop:px-7 ds-down-mobile:h-[3.4375rem] ds-down-mobile:py-0 ds-down-mobile:px-5 [.exploration-shell_&]:[background:#0d1328] [.exploration-shell_&]:[border-color:#28304d]">
        <Breadcrumb screen={screen} />
        {topbarRight}
      </header>
      {children}
    </div>
  );
}
export function PageFooter() {
  return (
    <footer className="page-footer flex justify-between gap-5 text-[#686875] [border-top:1px_solid_#e7e8ed] text-micro mt-7.5 pt-5 pr-0 pb-5.5 pl-0 [&_>_span:last-child_>_span]:text-[#9981c4] [&_>_span:last-child_>_span]:ml-[0.5625rem] ds-down-tablet:text-detail ds-down-tablet:[&_>_span:last-child]:hidden ds-down-mobile:text-micro [.exploration-shell_&]:text-[#b2bdd7] [.exploration-shell_&]:[border-color:#303956]">
      <span>Um novo jeito de olhar para a matemática.</span>
      <span>
        Sem pressa, a descoberta acontece. <span aria-hidden="true">✦</span>
      </span>
    </footer>
  );
}
export function StorageWarning({ available }: { available: boolean }) {
  if (available) return null;
  return (
    <p
      className="storage-warning p-[0.9375rem] [background:#fff4d8] [border:1px_solid_#e9d19b] rounded-option text-[#775625] text-support mb-[1.5625rem]"
      role="status"
    >
      O navegador não permitiu salvar. Você pode continuar jogando, mas o progresso será perdido ao
      fechar ou recarregar.
    </p>
  );
}
