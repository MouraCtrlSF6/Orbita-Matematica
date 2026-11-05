import type { ComponentProps, ReactNode } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { mergeClasses } from '../../utils/merge-classes';
import { CollapsibleVariant, collapsibleTriggerStyles } from '../collapsible-styles';

export interface CollapsibleTriggerProps extends Omit<
  ComponentProps<typeof CollapsiblePrimitive.Trigger>,
  'asChild' | 'children' | 'type' | 'title'
> {
  title: ReactNode;
  variant?: CollapsibleVariant;
}

export function CollapsibleTrigger({
  title,
  variant = CollapsibleVariant.Default,
  className,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      type="button"
      className={mergeClasses(
        'collapsible-trigger group flex min-h-11 w-full items-center justify-between gap-3 rounded-control border-0 bg-transparent text-left text-body text-ink hover:bg-selected disabled:cursor-not-allowed disabled:opacity-50',
        collapsibleTriggerStyles[variant],
        className,
      )}
    >
      <span className="min-w-0">{title}</span>
      <svg
        className="size-4 shrink-0 group-data-[state=open]:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </CollapsiblePrimitive.Trigger>
  );
}
