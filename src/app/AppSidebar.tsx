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
    <a href="#main" className="brand" onClick={onMap} aria-label="Órbita Matemática, início">
      <span className="brand-symbol">
        <Icon name={IconName.Orbit} size={32} />
      </span>
      <span>
        órbita<span className="brand-subtitle">MATEMÁTICA</span>
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
  return <span className="nav-count">{count}</span>;
}
function NavigationItem({ active, icon, label, onClick, count }: NavigationItemProps) {
  return (
    <button
      className={`nav-item ${active ? 'active' : ''}`}
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
    <nav aria-label="Navegação principal">
      {items.map((item) => (
        <NavigationItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
const sidebarMessage = (
  <div className="sidebar-message">
    <span aria-hidden="true">✧</span>
    <p>
      Aprender é uma jornada.
      <br />
      <strong>O ritmo é seu.</strong>
    </p>
    <div className="tiny-orbit" aria-hidden="true" />
  </div>
);
const sidebarFooter = (
  <div className="sidebar-footer">
    <span className="live-dot" /> FEITO PARA TODOS EXPLORAREM
  </div>
);
function SidebarBottom({ navigation }: { navigation: AppNavigation }) {
  return (
    <div className="sidebar-bottom">
      {sidebarMessage}
      <button className="nav-item" onClick={navigation.openSettings}>
        <Icon name={IconName.Settings} />
        Ajustes da expedição
      </button>
      {sidebarFooter}
    </div>
  );
}
export function AppSidebar(props: AppSidebarProps) {
  return (
    <aside className="sidebar">
      <Brand onMap={props.navigation.map} />
      <div className="sidebar-caption">SUA JORNADA</div>
      <MainNavigation {...props} />
      <SidebarBottom navigation={props.navigation} />
    </aside>
  );
}
