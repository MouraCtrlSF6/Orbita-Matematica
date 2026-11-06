import type { ComponentProps, ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { DialogVariant } from './dialog-styles';
import { DialogPortal } from './DialogPortal/DialogPortal';

export interface DialogProps extends ComponentProps<typeof DialogPrimitive.Root> {
  title: ReactNode;
  description: ReactNode;
  trigger?: ReactNode;
  closeLabel?: string;
  variant?: DialogVariant;
  className?: string;
  contentProps?: ComponentProps<typeof DialogPrimitive.Content>;
  portalContainer?: HTMLElement | null;
}

export function Dialog({
  title,
  description,
  trigger,
  closeLabel = 'Fechar diálogo',
  variant,
  className,
  contentProps,
  portalContainer,
  children,
  ...props
}: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPortal
        title={title}
        description={description}
        closeLabel={closeLabel}
        variant={variant}
        className={className}
        contentProps={contentProps}
        container={portalContainer}
      >
        {children}
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
