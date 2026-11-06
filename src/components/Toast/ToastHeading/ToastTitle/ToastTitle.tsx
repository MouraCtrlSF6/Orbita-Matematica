import type { ReactNode } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { ToastVariant } from '../../toast-styles';

const statusIcons: Partial<Record<ToastVariant, typeof CheckCircledIcon>> = {
  [ToastVariant.Success]: CheckCircledIcon,
  [ToastVariant.Error]: CrossCircledIcon,
};

interface ToastTitleProps {
  title: ReactNode;
  variant: ToastVariant;
}

export function ToastTitle({ title, variant }: ToastTitleProps) {
  const StatusIcon = statusIcons[variant];

  return (
    <ToastPrimitive.Title className="flex min-w-0 items-start gap-2 pt-2 font-heading text-body font-bold">
      {StatusIcon && (
        <StatusIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-current" />
      )}
      <span className="min-w-0">{title}</span>
    </ToastPrimitive.Title>
  );
}
