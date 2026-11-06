import type { ComponentProps } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { mergeClasses } from '../../utils/merge-classes';
import { TooltipVariant, tooltipStyles, tooltipArrowStyles } from '../tooltip-styles';

export interface TooltipContentProps extends Omit<
  ComponentProps<typeof TooltipPrimitive.Content>,
  'asChild'
> {
  variant?: TooltipVariant;
  portalContainer?: HTMLElement | null;
}

export function TooltipContent({
  variant = TooltipVariant.Default,
  portalContainer,
  className,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal container={portalContainer}>
      <TooltipPrimitive.Content
        sideOffset={8}
        collisionPadding={8}
        {...props}
        className={mergeClasses(
          'tooltip-content z-50 max-w-[min(18rem,var(--radix-tooltip-content-available-width))] rounded-control border px-3 py-2 text-small leading-relaxed whitespace-normal wrap-anywhere shadow-lg',
          tooltipStyles[variant],
          className,
        )}
      >
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrowStyles[variant]} aria-hidden="true" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
