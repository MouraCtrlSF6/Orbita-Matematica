import { Icon } from '../components/Icon';
import type { IconName } from '../components/icon-names';
import { NavigationBadge } from './NavigationBadge';

export interface NavigationItemProps {
  active: boolean;
  icon: IconName;
  label: string;
  onClick: () => void;
  count?: number;
}

export function NavigationItem({ active, icon, label, onClick, count }: NavigationItemProps) {
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
