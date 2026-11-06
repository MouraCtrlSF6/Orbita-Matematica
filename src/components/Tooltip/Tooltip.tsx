import type { ComponentProps, ReactElement, ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { mergeClasses } from '../utils/merge-classes';
import type { TooltipVariant } from './tooltip-styles';
import { TooltipContent } from './TooltipContent/TooltipContent';

export interface TooltipProps extends ComponentProps<typeof TooltipPrimitive.Root> {
  children: ReactElement;
  content: ReactNode;
  variant?: TooltipVariant;
  className?: string;
  portalContainer?: HTMLElement | null;
  triggerProps?: Omit<ComponentProps<typeof TooltipPrimitive.Trigger>, 'children' | 'asChild'>;
  contentProps?: Omit<ComponentProps<typeof TooltipPrimitive.Content>, 'children' | 'asChild'>;
  providerProps?: Omit<ComponentProps<typeof TooltipPrimitive.Provider>, 'children'>;
}

export function Tooltip({
  children,
  content,
  variant,
  className,
  portalContainer,
  triggerProps,
  contentProps,
  providerProps,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={400} {...providerProps}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger {...triggerProps} asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipContent
          {...contentProps}
          variant={variant}
          portalContainer={portalContainer}
          className={mergeClasses(className, contentProps?.className)}
        >
          {content}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
