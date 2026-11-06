import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons';

export function CheckboxIndicator() {
  return (
    <CheckboxPrimitive.Indicator aria-hidden className="group">
      <CheckIcon className="group-data-[state=indeterminate]:hidden" />
      <MinusIcon className="hidden group-data-[state=indeterminate]:inline" />
    </CheckboxPrimitive.Indicator>
  );
}
