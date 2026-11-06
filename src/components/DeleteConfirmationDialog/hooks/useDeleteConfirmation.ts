import { useRef, useState } from 'react';

export function useDeleteConfirmation(
  onConfirm: () => Promise<boolean | void>,
  errorMessage: string,
  pending: boolean,
) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);

  const changeOpen = (next: boolean) => {
    if (busy.current) return;
    setError('');
    setOpen(next);
  };

  const confirm = async () => {
    if (busy.current || pending) return;
    busy.current = true;
    setSaving(true);
    setError('');

    try {
      const result = await onConfirm();

      if (result === false) setError(errorMessage);
      else setOpen(false);
    } catch {
      setError(errorMessage);
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };

  return { open, error, pending: saving, changeOpen, confirm };
}
