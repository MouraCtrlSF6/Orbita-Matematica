import type { ComponentProps } from 'react';
import { createPortal } from 'react-dom';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { mergeClasses } from '../../../utils/merge-classes';

export interface ToastViewportProps extends Omit<
  ComponentProps<typeof ToastPrimitive.Viewport>,
  'asChild' | 'children'
> {
  portalContainer?: HTMLElement | null;
}

export function ToastViewport({
  label = 'Notificações ({hotkey})',
  portalContainer,
  className,
  ...props
}: ToastViewportProps) {
  const viewport = (
    <ToastPrimitive.Viewport
      label={label}
      {...props}
      className={mergeClasses(
        'toast-viewport fixed right-4 bottom-4 z-50 m-0 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-96 list-none flex-col gap-3 overflow-y-auto p-0',
        className,
      )}
    />
  );

  return portalContainer ? createPortal(viewport, portalContainer) : viewport;
}
