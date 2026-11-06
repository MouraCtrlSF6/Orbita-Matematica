import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '../../Button/Button';
import { Tooltip } from '../Tooltip';

export interface TooltipButtonProps extends ButtonProps {
  tooltip?: ReactNode;
}

export function TooltipButton({ tooltip, children, ...props }: TooltipButtonProps) {
  return (
    <Tooltip content={tooltip ?? props['aria-label'] ?? children}>
      <Button {...props}>{children}</Button>
    </Tooltip>
  );
}
