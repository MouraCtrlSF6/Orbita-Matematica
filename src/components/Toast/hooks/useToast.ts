import { useContext } from 'react';
import { ToastNotificationsContext } from '../contexts/toast-notifications';

export function useToast() {
  const notify = useContext(ToastNotificationsContext);

  if (!notify) throw new Error('useToast requires a ToastNotificationsProvider.');
  return notify;
}
