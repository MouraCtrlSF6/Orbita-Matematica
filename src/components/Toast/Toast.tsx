import type { ComponentProps, ReactNode } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { mergeClasses } from '../utils/merge-classes';
import { ToastVariant, toastStyles } from './toast-styles';
import { ToastHeading } from './ToastHeading/ToastHeading';
import { ToastDetails } from './ToastDetails/ToastDetails';
import type { ToastActionOptions } from './ToastDetails/ToastAction/ToastAction';

export interface ToastProps extends Omit<
  ComponentProps<typeof ToastPrimitive.Root>,
  'title' | 'children' | 'asChild'
> {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  closeLabel?: string;
  action?: ToastActionOptions;
}

export function Toast({
  title,
  description,
  variant = ToastVariant.Default,
  closeLabel = 'Fechar notificação',
  action,
  className,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      {...props}
      className={mergeClasses(
        'toast min-w-0 shrink-0 rounded-card border p-4 text-body wrap-anywhere shadow-lg focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2 data-[state=closed]:hidden data-[swipe=move]:[transform:translate(var(--radix-toast-swipe-move-x),var(--radix-toast-swipe-move-y))] data-[swipe=cancel]:transform-none',
        toastStyles[variant],
        className,
      )}
    >
      <ToastHeading title={title} closeLabel={closeLabel} variant={variant} />
      <ToastDetails description={description} action={action} />
    </ToastPrimitive.Root>
  );
}
