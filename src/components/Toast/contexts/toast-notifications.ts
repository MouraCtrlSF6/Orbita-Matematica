import { createContext } from 'react';
import type { ToastVariant } from '../toast-styles';

export type Notify = (title: string, variant: ToastVariant) => void;

export const ToastNotificationsContext = createContext<Notify | null>(null);
