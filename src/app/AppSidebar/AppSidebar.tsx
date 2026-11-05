import { useStudentGame } from '../../pages/students/hooks/useStudentGame';
import { Brand } from './Brand/Brand';
import { MainNavigation } from './MainNavigation/MainNavigation';
import { SidebarBottom } from './SidebarBottom/SidebarBottom';

export function AppSidebar() {
  const { navigation } = useStudentGame();

  return (
    <aside className="sidebar w-60 shrink-0 bg-sidebar text-[#bfc0d0] pt-9 pr-5 pb-5.5 pl-5 flex flex-col fixed [inset:0_auto_0_0] [z-index:2] [&_nav]:grid [&_nav]:gap-[0.4375rem] ds-down-desktop:w-52 ds-down-desktop:pl-[0.8125rem] ds-down-desktop:pr-[0.8125rem] ds-down-tablet:w-[11.5625rem] ds-down-mobile:static ds-down-mobile:w-full ds-down-mobile:py-[0.9375rem] ds-down-mobile:px-4.5 ds-down-mobile:block ds-down-mobile:[&_nav]:flex ds-down-mobile:[&_nav]:flex-wrap ds-down-mobile:[&_nav]:gap-1.5">
      <Brand onMap={navigation.map} />
      <div className="sidebar-caption text-eyebrow font-bold tracking-[0.125rem] text-[#8c8ea8] mt-0 mr-[1.0625rem] mb-[0.9375rem] ml-[1.0625rem] ds-down-tablet:ml-[0.5625rem] ds-down-mobile:hidden">
        SUA JORNADA
      </div>
      <MainNavigation />
      <SidebarBottom />
    </aside>
  );
}
