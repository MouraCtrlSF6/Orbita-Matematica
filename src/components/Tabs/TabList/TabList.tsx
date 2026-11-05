import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { TabItem } from '../Tabs';
import type { TabsVariant } from '../tab-styles';
import { TabTrigger } from './TabTrigger/TabTrigger';

export interface TabListProps {
  label: string;
  items: readonly TabItem[];
  variant?: TabsVariant;
}

export function TabList({ label, items, variant }: TabListProps) {
  return (
    <TabsPrimitive.List
      aria-label={label}
      className="flex flex-wrap gap-3 data-[orientation=vertical]:flex-col"
    >
      {items.map((item) => (
        <TabTrigger key={item.value} value={item.value} disabled={item.disabled} variant={variant}>
          {item.label}
        </TabTrigger>
      ))}
    </TabsPrimitive.List>
  );
}
