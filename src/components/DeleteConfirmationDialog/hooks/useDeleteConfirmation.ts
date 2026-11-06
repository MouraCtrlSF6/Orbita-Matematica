import { useRef, useState, type RefObject } from 'react';
import { useToast } from '../../Toast/hooks/useToast';
import type { Notify } from '../../Toast/contexts/toast-notifications';
import { ToastVariant } from '../../Toast/toast-styles';

interface ConfirmationActions {
  busy: RefObject<boolean>;
  setOpen: (open: boolean) => void;
  setError: (error: string) => void;
  setSaving: (saving: boolean) => void;
  notify: Notify;
  onConfirm: () => Promise<boolean | void>;
  errorMessage: string;
  successMessage: string;
}

function changeOpen(actions: ConfirmationActions, next: boolean) {
  if (actions.busy.current) return;
  actions.setError('');
  actions.setOpen(next);
}

async function executeConfirmation(actions: ConfirmationActions) {
  try {
    const result = await actions.onConfirm();

    if (result === false) throw new Error(actions.errorMessage);
    actions.notify(actions.successMessage, ToastVariant.Success);
    actions.setOpen(false);
  } catch {
    actions.setError(actions.errorMessage);
    actions.notify(actions.errorMessage, ToastVariant.Error);
  } finally {
    actions.busy.current = false;
    actions.setSaving(false);
  }
}

function confirm(actions: ConfirmationActions, pending: boolean) {
  if (actions.busy.current || pending) return;
  actions.busy.current = true;
  actions.setSaving(true);
  actions.setError('');
  return executeConfirmation(actions);
}

export function useDeleteConfirmation(
  onConfirm: () => Promise<boolean | void>,
  errorMessage: string,
  pending: boolean,
  successMessage: string,
) {
  const notify = useToast();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);
  const actions: ConfirmationActions = {
    busy,
    setOpen,
    setError,
    setSaving,
    notify,
    onConfirm,
    errorMessage,
    successMessage,
  };

  return {
    open,
    error,
    pending: saving || pending,
    changeOpen: (next: boolean) => changeOpen(actions, next),
    confirm: () => confirm(actions, pending),
  };
}
