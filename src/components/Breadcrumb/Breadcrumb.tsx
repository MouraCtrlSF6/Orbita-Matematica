import type { ReactNode } from 'react';
import { BreadcrumbEntry } from './BreadcrumbEntry/BreadcrumbEntry';

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  label?: string;
}

export function Breadcrumb({ items, label = 'Localização atual' }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none text-body">
        {items.map((item, index) => (
          <BreadcrumbEntry
            key={item.id}
            item={item}
            first={index === 0}
            current={index === items.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
}
