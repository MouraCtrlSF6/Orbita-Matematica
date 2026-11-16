export interface NavigationBadgeProps {
  count?: number;
}

export function NavigationBadge({ count }: NavigationBadgeProps) {
  if (count === undefined) return null;
  return (
    <span className="nav-count ml-auto shrink-0 text-caption [background:#343449] rounded-sm py-0 px-[0.3125rem] ds-down-mobile:ml-0">
      {count}
    </span>
  );
}
