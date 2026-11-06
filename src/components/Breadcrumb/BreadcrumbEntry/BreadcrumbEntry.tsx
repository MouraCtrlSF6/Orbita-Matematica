import type { BreadcrumbItem } from '../Breadcrumb';

interface BreadcrumbEntryProps {
  item: BreadcrumbItem;
  first: boolean;
  current: boolean;
}

export function BreadcrumbEntry({ item, first, current }: BreadcrumbEntryProps) {
  return (
    <li className="flex items-center gap-2 min-w-0">
      <span aria-hidden="true" className={first ? 'hidden' : 'text-muted'}>
        /
      </span>
      <span
        aria-current={current ? 'page' : undefined}
        data-first={first}
        className="text-ink data-[first=true]:font-bold data-[first=true]:text-primary [overflow-wrap:anywhere]"
      >
        {item.label}
      </span>
    </li>
  );
}
