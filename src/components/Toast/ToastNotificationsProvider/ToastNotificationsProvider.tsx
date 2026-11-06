import { useRef, useState, type ReactNode } from 'react';
import { ToastNotificationsContext, type Notify } from '../contexts/toast-notifications';
import { Toast } from '../Toast';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import type { ToastVariant } from '../toast-styles';

interface Notification {
  id: number;
  title: string;
  variant: ToastVariant;
}

interface ToastNotificationsProviderProps {
  children: ReactNode;
}

export function ToastNotificationsProvider({ children }: ToastNotificationsProviderProps) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const sequence = useRef(0);
  const notify: Notify = (title, variant) => {
    setNotification({
      id: ++sequence.current,
      title,
      variant,
    });
  };

  return (
    <ToastNotificationsContext.Provider value={notify}>
      <ToastProvider>
        {children}
        {notification && (
          <Toast key={notification.id} title={notification.title} variant={notification.variant} />
        )}
      </ToastProvider>
    </ToastNotificationsContext.Provider>
  );
}
