import { Icon } from '../components/Icon';
import { IconName } from '../components/icon-names';
import { Screen, type GameState } from '../game/reducer';
import { type AppNavigation, isExploration } from './app-navigation';
interface AppSidebarProps {
  state: GameState;
  navigation: AppNavigation;
}
interface BrandProps {
  onMap: () => void;
}
function Brand({ onMap }: BrandProps) {
  return (
    <a
      href="#main"
      className="brand no-underline flex items-center gap-3 mt-0 mr-[0.9375rem] mb-15.5 ml-[0.9375rem] text-[#f8f5ff] font-heading text-brand font-extrabold leading-[1.2] tracking-[-0.09375rem] ds-down-desktop:ml-3 ds-down-desktop:text-brand-compact ds-down-tablet:text-dialog-heading ds-down-tablet:ml-1 ds-down-tablet:gap-1.5 ds-down-mobile:text-brand-mobile ds-down-mobile:mt-0 ds-down-mobile:mr-0 ds-down-mobile:mb-4 ds-down-mobile:ml-0 ds-down-mobile:justify-center"
      onClick={onMap}
      aria-label="Órbita Matemática, início"
    >
      <span className="brand-symbol text-[#c0adf3] [transform:rotate(-10deg)] ds-down-tablet:[&_svg]:w-7">
        <Icon name={IconName.Orbit} size={32} />
      </span>
      <span>
        órbita
        <span className="brand-subtitle block [font:600_0.5625rem_'DM_Sans',_sans-serif] tracking-[0.1875rem] mt-[0.3125rem] text-[#a9a6c0] ds-down-tablet:text-micro ds-down-mobile:text-detail ds-down-mobile:tracking-[0.125rem]">
          MATEMÁTICA
        </span>
      </span>
    </a>
  );
}
interface NavigationItemProps {
  active: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
  count?: number;
}
function NavigationBadge({ count }: { count?: number }) {
  if (count === undefined) return null;
  return (
    <span className="nav-count ml-auto shrink-0 text-caption [background:#343449] rounded-sm py-0 px-[0.3125rem] ds-down-mobile:ml-0">
      {count}
    </span>
  );
}
function NavigationItem({ active, icon, label, onClick, count }: NavigationItemProps) {
  return (
    <button
      className={`nav-item [border:0] text-[#b5b6c8] [background:none] flex items-center text-left gap-[0.8125rem] min-h-[3.0625rem] py-3 px-3.5 rounded-option w-full min-w-0 [overflow-wrap:anywhere] text-small font-medium whitespace-normal [&_svg]:text-[#9193ae] [&_svg]:w-[1.1875rem] ds-hover:[background:#22243b] ds-hover:text-white ds-active:[background:#29263f] ds-active:text-[#dbcef9] ds-active:[box-shadow:inset_0.1875rem_0_#baa0f1] [&.active_svg]:text-[#c5adf8] ds-down-desktop:text-label ds-down-desktop:gap-[0.5625rem] ds-down-tablet:whitespace-normal ds-down-tablet:py-3 ds-down-tablet:px-[0.5625rem] ds-down-mobile:justify-center ds-down-mobile:text-center ds-down-mobile:text-caption ds-down-mobile:gap-1.5 ds-down-mobile:py-[0.5625rem] ds-down-mobile:px-1.5 ds-down-mobile:min-h-[2.6875rem] ds-down-mobile:[flex:1] ds-down-mobile:[&_svg]:w-4 ds-down-mobile:[.sidebar-bottom_&]:absolute ds-down-mobile:[.sidebar-bottom_&]:top-[1.0625rem] ds-down-mobile:[.sidebar-bottom_&]:right-[0.9375rem] ds-down-mobile:[.sidebar-bottom_&]:w-10 ds-down-mobile:[.sidebar-bottom_&]:overflow-hidden ds-down-mobile:[.sidebar-bottom_&]:block ds-down-mobile:[.sidebar-bottom_&]:text-transparent ds-down-mobile:[.sidebar-bottom_&]:text-[length:0] ds-down-mobile:[.sidebar-bottom_&]:min-h-10 ds-down-mobile:[.sidebar-bottom_&_svg]:text-[#b9a5db] ds-down-mobile:[.sidebar-bottom_&_svg]:w-5 ${active ? 'active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <Icon name={icon} />
      {label}
      <NavigationBadge count={count} />
    </button>
  );
}
function MainNavigation({ state, navigation }: AppSidebarProps) {
  const items: NavigationItemProps[] = [
    {
      active: isExploration(state.screen) || state.screen === Screen.Mission,
      icon: IconName.Map,
      label: 'Mapa da expedição',
      onClick: navigation.map,
    },
    {
      active: state.screen === Screen.Summary,
      icon: IconName.Flag,
      label: 'Minhas descobertas',
      onClick: navigation.summary,
      count: Object.keys(state.save.completed).length,
    },
    {
      active: state.screen === Screen.Tutorial,
      icon: IconName.Book,
      label: 'Como jogar',
      onClick: navigation.tutorial,
    },
  ];
  return (
    <nav
      className="min-w-0 [grid-template-columns:minmax(0,_1fr)]"
      aria-label="Navegação principal"
    >
      {items.map((item) => (
        <NavigationItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
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
function SidebarBottom({ navigation }: { navigation: AppNavigation }) {
  return (
    <div className="sidebar-bottom mt-auto pt-10 ds-down-mobile:p-0 ds-down-mobile:m-0">
      {sidebarMessage}
      <button
        className="nav-item [border:0] text-[#b5b6c8] [background:none] flex items-center text-left gap-[0.8125rem] min-h-[3.0625rem] py-3 px-3.5 rounded-option w-full min-w-0 [overflow-wrap:anywhere] text-small font-medium whitespace-normal [&_svg]:text-[#9193ae] [&_svg]:w-[1.1875rem] ds-hover:[background:#22243b] ds-hover:text-white [&.active_svg]:text-[#c5adf8] ds-down-desktop:text-label ds-down-desktop:gap-[0.5625rem] ds-down-tablet:whitespace-normal ds-down-tablet:py-3 ds-down-tablet:px-[0.5625rem] ds-down-mobile:justify-center ds-down-mobile:text-center ds-down-mobile:text-caption ds-down-mobile:gap-1.5 ds-down-mobile:py-[0.5625rem] ds-down-mobile:px-1.5 ds-down-mobile:min-h-[2.6875rem] ds-down-mobile:[flex:1] ds-down-mobile:[&_svg]:w-4 ds-down-mobile:[.sidebar-bottom_&]:absolute ds-down-mobile:[.sidebar-bottom_&]:top-[1.0625rem] ds-down-mobile:[.sidebar-bottom_&]:right-[0.9375rem] ds-down-mobile:[.sidebar-bottom_&]:w-10 ds-down-mobile:[.sidebar-bottom_&]:overflow-hidden ds-down-mobile:[.sidebar-bottom_&]:block ds-down-mobile:[.sidebar-bottom_&]:text-transparent ds-down-mobile:[.sidebar-bottom_&]:text-[length:0] ds-down-mobile:[.sidebar-bottom_&]:min-h-10 ds-down-mobile:[.sidebar-bottom_&_svg]:text-[#b9a5db] ds-down-mobile:[.sidebar-bottom_&_svg]:w-5"
        onClick={navigation.openSettings}
      >
        <Icon name={IconName.Settings} />
        Ajustes da expedição
      </button>
      {sidebarFooter}
    </div>
  );
}
export function AppSidebar(props: AppSidebarProps) {
  return (
    <aside className="sidebar w-60 shrink-0 bg-sidebar text-[#bfc0d0] pt-9 pr-5 pb-5.5 pl-5 flex flex-col fixed [inset:0_auto_0_0] [z-index:2] [&_nav]:grid [&_nav]:gap-[0.4375rem] ds-down-desktop:w-52 ds-down-desktop:pl-[0.8125rem] ds-down-desktop:pr-[0.8125rem] ds-down-tablet:w-[11.5625rem] ds-down-mobile:static ds-down-mobile:w-full ds-down-mobile:py-[0.9375rem] ds-down-mobile:px-4.5 ds-down-mobile:block ds-down-mobile:[&_nav]:flex ds-down-mobile:[&_nav]:flex-wrap ds-down-mobile:[&_nav]:gap-1.5">
      <Brand onMap={props.navigation.map} />
      <div className="sidebar-caption text-eyebrow font-bold tracking-[0.125rem] text-[#8c8ea8] mt-0 mr-[1.0625rem] mb-[0.9375rem] ml-[1.0625rem] ds-down-tablet:ml-[0.5625rem] ds-down-mobile:hidden">
        SUA JORNADA
      </div>
      <MainNavigation {...props} />
      <SidebarBottom navigation={props.navigation} />
    </aside>
  );
}
