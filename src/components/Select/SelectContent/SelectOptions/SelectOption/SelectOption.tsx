import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';

export interface SelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function SelectOption({ label, ...props }: SelectOptionProps) {
  return (
    <SelectPrimitive.Item
      {...props}
      className="relative flex min-h-11 cursor-pointer items-center rounded-control py-2 pr-9 pl-3 text-body text-ink outline-none data-highlighted:bg-selected data-disabled:pointer-events-none data-disabled:opacity-50"
    >
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3" aria-hidden>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
