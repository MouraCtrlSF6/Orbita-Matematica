import type { ComponentProps } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { mergeClasses } from '../../../utils/merge-classes';
import { tabStyles, TabsVariant } from '../../tab-styles';

export interface TabTriggerProps extends ComponentProps<typeof TabsPrimitive.Trigger> {
  variant?: TabsVariant;
}

export function TabTrigger({ variant = TabsVariant.Pills, className, ...props }: TabTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      {...props}
      className={mergeClasses(
        'min-h-11 px-4 py-2 text-body font-semibold text-muted disabled:opacity-50',
        tabStyles[variant],
        className,
      )}
    />
  );
}
