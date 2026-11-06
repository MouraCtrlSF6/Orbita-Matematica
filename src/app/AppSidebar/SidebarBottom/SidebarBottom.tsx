import { Button } from '../../../components/Button/Button';
import { ButtonVariant } from '../../../components/Button/button-styles';
import { LeaveRoomLink } from './LeaveRoomLink/LeaveRoomLink';
import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { Icon } from '../../../components/Icon/Icon';
import { IconName } from '../../../components/icon-names';

const sidebarMessage = (
  <div className="sidebar-message [border:1px_solid_#36344b] [background:radial-gradient(ellipse_at_85%_100%,_#34304a,_transparent_80%)] rounded-tile pt-5.5 pr-4.5 pb-6.5 pl-4.5 mt-0 mr-[0.4375rem] mb-[1.5625rem] ml-[0.4375rem] relative overflow-hidden [&_>_span]:text-brand-compact [&_>_span]:text-[#c5addf] [&_>_span]:leading-[1] [&_p]:text-small [&_p]:leading-[1.8] [&_p]:mt-[0.5625rem] [&_p]:text-[#b7b2c9] [&_strong]:text-[#f5edf9] [&_strong]:font-medium ds-down-tablet:ml-0 ds-down-tablet:mr-0 ds-down-tablet:py-4.5 ds-down-tablet:px-3 ds-down-mobile:hidden">
    <span aria-hidden="true">✧</span>
    <p>
      Aprender é uma jornada.
      <br />
      <strong>O ritmo é seu.</strong>
    </p>
    <div
      className="tiny-orbit absolute w-[4.6875rem] h-[4.6875rem] [border:1px_solid_#655577] rounded-full -bottom-10.5 -right-2.5 [&:after]:[content:''] [&:after]:absolute [&:after]:[inset:0.625rem] [&:after]:[border:1px_solid_#655577] [&:after]:rounded-full"
      aria-hidden="true"
    />
  </div>
);

const sidebarFooter = (
  <div className="sidebar-footer [border-top:1px_solid_#292c40] mt-5 mr-3 mb-0 ml-3 pt-[1.4375rem] flex items-center gap-2 text-detail tracking-[0.0625rem] text-[#a4a5b8] ds-down-tablet:text-radar ds-down-tablet:ml-[0.3125rem] ds-down-tablet:mr-[0.3125rem] ds-down-mobile:hidden">
    <span className="live-dot w-1.5 h-1.5 rounded-full [background:#aee0c8] inline-block shrink-0 [.pill_&]:w-1 [.pill_&]:h-1" />{' '}
    FEITO PARA TODOS EXPLORAREM
  </div>
);

export function SidebarBottom() {
  const { navigation } = useStudentGame();

  return (
    <div className="sidebar-bottom mt-auto pt-10 ds-down-mobile:p-0 ds-down-mobile:m-0">
      {sidebarMessage}
      <Button
        variant={ButtonVariant.Navigation}

        onClick={navigation.openSettings}
      >
        <Icon name={IconName.Settings} />
        Ajustes da expedição
      </Button>
      <LeaveRoomLink />
      {sidebarFooter}
    </div>
  );
}
