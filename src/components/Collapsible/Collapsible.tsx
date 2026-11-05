import type { ComponentProps, ReactNode } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { mergeClasses } from '../utils/merge-classes';
import {
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
} from './CollapsibleTrigger/CollapsibleTrigger';
import {
  CollapsibleVariant,
  collapsibleStyles,
  collapsibleContentStyles,
} from './collapsible-styles';

export interface CollapsibleProps extends Omit<
  ComponentProps<typeof CollapsiblePrimitive.Root>,
  'title' | 'asChild'
> {
  title: ReactNode;
  variant?: CollapsibleVariant;
  keepMounted?: boolean;
  triggerProps?: Omit<CollapsibleTriggerProps, 'title' | 'variant'>;
  contentProps?: Omit<
    ComponentProps<typeof CollapsiblePrimitive.Content>,
    'asChild' | 'children' | 'forceMount'
  >;
}

export function Collapsible({
  title,
  variant = CollapsibleVariant.Default,
  keepMounted = false,
  className,
  triggerProps,
  contentProps,
  children,
  ...props
}: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      {...props}
      className={mergeClasses(
        'collapsible min-w-0 [overflow-wrap:anywhere]',
        collapsibleStyles[variant],
        className,
      )}
    >
      <CollapsibleTrigger {...triggerProps} title={title} variant={variant} />
      <CollapsiblePrimitive.Content
        {...contentProps}
        forceMount={keepMounted || undefined}
        className={mergeClasses(
          'collapsible-content data-[state=closed]:hidden',
          collapsibleContentStyles[variant],
          contentProps?.className,
        )}
      >
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
