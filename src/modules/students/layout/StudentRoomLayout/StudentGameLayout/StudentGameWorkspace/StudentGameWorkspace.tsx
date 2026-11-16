import type { ReactNode } from 'react';
import { Icon } from '../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../components/icon-names';
import { Screen } from '../../../../session/reducer-types';
import { StudentGameBreadcrumb } from './StudentGameBreadcrumb/StudentGameBreadcrumb';

const topbarRight = (
  <div className="topbar-right flex items-center gap-6.5">
    <span className="learning-label text-micro font-semibold tracking-[0.0625rem] text-[#626575] flex items-center gap-2 ds-down-tablet:hidden [.exploration-shell_&]:text-[#aebbd5]">
      <span className="live-dot w-1.5 h-1.5 rounded-full [background:#aee0c8] inline-block shrink-0 in-[.pill]:w-1 in-[.pill]:h-1" />{' '}
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

export interface StudentGameWorkspaceProps {
  screen: Screen;
  children: ReactNode;
}

export function StudentGameWorkspace({ screen, children }: StudentGameWorkspaceProps) {
  return (
    <div className="workspace ml-60 min-w-0 w-[calc(100%-15rem)] ds-down-desktop:ml-52 ds-down-desktop:w-[calc(100%-13rem)] ds-down-tablet:ml-46.25 ds-down-tablet:w-[calc(100%-11.5625rem)] ds-down-mobile:m-0 ds-down-mobile:w-full">
      <header className="topbar h-20.75 [border-bottom:1px_solid_var(--line)] flex justify-between items-center py-0 px-11 bg-white ds-down-desktop:py-0 ds-down-desktop:px-7 ds-down-mobile:h-13.75 ds-down-mobile:py-0 ds-down-mobile:px-5 in-[.exploration-shell]:[background:#0d1328] in-[.exploration-shell]:border-[#28304d]">
        <StudentGameBreadcrumb screen={screen} />
        {topbarRight}
      </header>
      {children}
    </div>
  );
}
