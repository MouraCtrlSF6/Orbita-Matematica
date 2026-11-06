import { ToastTitle } from './ToastTitle/ToastTitle';
import type { ReactNode } from 'react';
import { ToastCloseButton } from './ToastCloseButton/ToastCloseButton';
import type { ToastVariant } from '../toast-styles';

export interface ToastHeadingProps {
  title: ReactNode;
  closeLabel: string;
  variant: ToastVariant;
}

export function ToastHeading({ title, closeLabel, variant }: ToastHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <ToastTitle title={title} variant={variant} />
      <ToastCloseButton label={closeLabel} />
    </div>
  );
}
