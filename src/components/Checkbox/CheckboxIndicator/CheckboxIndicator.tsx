import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export function CheckboxIndicator() {
  return (
    <CheckboxPrimitive.Indicator aria-hidden className="group">
      <span className="group-data-[state=indeterminate]:hidden">✓</span>
      <span className="hidden group-data-[state=indeterminate]:inline">−</span>
    </CheckboxPrimitive.Indicator>
  );
}
