import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { IconName } from '../../../components/icon-names';
import { Screen } from '../../../game/reducer';
import { isExploration } from '../../app-navigation';
import type { NavigationItemProps } from './NavigationItem/NavigationItem';
import { NavigationItem } from './NavigationItem/NavigationItem';

export function MainNavigation() {
  const { state, navigation } = useStudentGame();

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
