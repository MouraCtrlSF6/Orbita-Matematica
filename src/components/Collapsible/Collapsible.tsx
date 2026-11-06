import type { ComponentProps, ReactNode } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { mergeClasses } from '../utils/merge-classes';
import type { CollapsibleTriggerProps } from './CollapsibleTrigger/CollapsibleTrigger';
import { CollapsibleHeading } from './CollapsibleHeading/CollapsibleHeading';
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
  heading?: 'h2' | 'h3' | 'h4';
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
  heading,
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
      <CollapsibleHeading {...triggerProps} heading={heading} title={title} variant={variant} />
      <CollapsiblePrimitive.Content
        {...contentProps}
        forceMount={keepMounted || undefined}
        className={mergeClasses(
          'collapsible-content overflow-hidden ds-reduced-motion:animate-none',
          keepMounted && 'collapsible-content-persistent',
        )}
      >
        <div className="collapsible-content-layout ds-reduced-motion:transition-none">
          <div className="min-h-0 overflow-hidden">
            <div
              className={mergeClasses(collapsibleContentStyles[variant], contentProps?.className)}
            >
              {children}
            </div>
          </div>
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
