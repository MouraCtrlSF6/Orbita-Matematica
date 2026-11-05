import type { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { mergeClasses } from '../../utils/merge-classes';
import { SelectOptions, type SelectOptionsProps } from './SelectOptions/SelectOptions';

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
      <SelectPrimitive.ScrollUpButton className="text-center" aria-label="Rolar para cima">
        ▴
      </SelectPrimitive.ScrollUpButton>
      <SelectOptions options={options} />
      <SelectPrimitive.ScrollDownButton className="text-center" aria-label="Rolar para baixo">
        ▾
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  );
}
