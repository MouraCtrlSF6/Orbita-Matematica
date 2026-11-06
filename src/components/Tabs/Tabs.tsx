import type { ComponentProps, ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { mergeClasses } from '../utils/merge-classes';
import type { TabsVariant } from './tab-styles';
import { TabList } from './TabList/TabList';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  keepMounted?: boolean;
}

export interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {
  label: string;
  items: readonly TabItem[];
  variant?: TabsVariant;
}

export function Tabs({ label, items, variant, className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root {...props} className={mergeClasses('grid gap-4', className)}>
      <TabList label={label} items={items} variant={variant} />
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          forceMount={item.keepMounted || undefined}
          className="data-[state=inactive]:hidden"
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
