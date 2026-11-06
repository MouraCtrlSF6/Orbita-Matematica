import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';

export interface SelectScrollButtonProps {
  direction: 'up' | 'down';
}

export function SelectScrollButton({ direction }: SelectScrollButtonProps) {
  const up = direction === 'up';
  const Component = up ? SelectPrimitive.ScrollUpButton : SelectPrimitive.ScrollDownButton;
  const Icon = up ? ChevronUpIcon : ChevronDownIcon;
  const label = up ? 'Rolar para cima' : 'Rolar para baixo';

  return (
    <Component className="flex justify-center" aria-label={label}>
      <Icon aria-hidden="true" />
    </Component>
  );
}
