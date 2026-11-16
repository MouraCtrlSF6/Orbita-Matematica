import { useEffect, useRef } from 'react';
export function useDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return ref;
}
