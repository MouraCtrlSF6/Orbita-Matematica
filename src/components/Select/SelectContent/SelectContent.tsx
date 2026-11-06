import type { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { mergeClasses } from '../../utils/merge-classes';
import { SelectOptions, type SelectOptionsProps } from './SelectOptions/SelectOptions';
import { SelectScrollButton } from './SelectScrollButton/SelectScrollButton';

export interface SelectContentProps extends ComponentProps<typeof SelectPrimitive.Content> {
  options: SelectOptionsProps['options'];
}

export function SelectContent({ options, className, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Content
      position="popper"
      sideOffset={4}
      {...props}
      className={mergeClasses(
        'z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-control border border-line bg-white p-1 shadow-lg',
        className,
      )}
    >
      <SelectScrollButton direction="up" />
      <SelectOptions options={options} />
      <SelectScrollButton direction="down" />
    </SelectPrimitive.Content>
  );
}
