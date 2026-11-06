import type { ComponentProps } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ToastViewport, type ToastViewportProps } from './ToastViewport/ToastViewport';

export interface ToastProviderProps extends ComponentProps<typeof ToastPrimitive.Provider> {
  viewportProps?: Omit<ToastViewportProps, 'portalContainer'>;
  portalContainer?: HTMLElement | null;
}

export function ToastProvider({
  children,
  viewportProps,
  portalContainer,
  ...props
}: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider label="Notificação" duration={6000} {...props}>
      {children}
      <ToastViewport {...viewportProps} portalContainer={portalContainer} />
    </ToastPrimitive.Provider>
  );
}
