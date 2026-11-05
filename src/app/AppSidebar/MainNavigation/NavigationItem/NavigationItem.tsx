import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';
import { Icon } from '../../../../components/Icon/Icon';
import type { IconName } from '../../../../components/icon-names';
import { NavigationBadge } from './NavigationBadge/NavigationBadge';

export interface NavigationItemProps {
  active: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
  count?: number;
}

export function NavigationItem({ active, icon, label, onClick, count }: NavigationItemProps) {
  return (
    <Button
      variant={ButtonVariant.Navigation}
      className={active ? 'active' : ''}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <Icon name={icon} />
      {label}
      <NavigationBadge count={count} />
    </Button>
  );
}
