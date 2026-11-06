import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectOption, type SelectOptionProps } from './SelectOption/SelectOption';

export interface SelectOptionsProps {
  options: readonly SelectOptionProps[];
}

export function SelectOptions({ options }: SelectOptionsProps) {
  return (
    <SelectPrimitive.Viewport>
      {options.map((option) => (
        <SelectOption key={option.value} {...option} />
      ))}
    </SelectPrimitive.Viewport>
  );
}
