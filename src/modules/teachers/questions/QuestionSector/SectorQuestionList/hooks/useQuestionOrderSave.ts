import { useRef, useState } from 'react';

export function useQuestionOrderSave(
  reorder: (id: string, target: string) => Promise<boolean>,
  pending: boolean,
) {
  const saveInProgress = useRef(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const context = { saveInProgress, setBusy, setMessage, reorder };

  return {
    busy: busy || pending,
    saving: busy,
    message,
    move: (id: string, destination: string) => move(context, pending, id, destination),
  };
}

interface SaveContext {
  saveInProgress: { current: boolean };
  setBusy: (busy: boolean) => void;
  setMessage: (message: string) => void;
  reorder: (id: string, destination: string) => Promise<boolean>;
}

async function move(context: SaveContext, pending: boolean, id: string, destination: string) {
  const { saveInProgress, setBusy, setMessage } = context;
  if (pending || saveInProgress.current || id === destination) return;
  saveInProgress.current = true;
  setBusy(true);
  setMessage('Salvando a ordem das questões…');

  return saveOrder(context, id, destination);
}

async function saveOrder(
  { saveInProgress, setBusy, setMessage, reorder }: SaveContext,
  id: string,
  destination: string,
) {
  try {
    const saved = await reorder(id, destination);

    setMessage(
      saved
        ? 'Ordem das questões salva.'
        : 'Não foi possível salvar a ordem. Confira o aviso do catálogo.',
    );
  } catch {
    setMessage('Não foi possível salvar a ordem. Tente novamente.');
  } finally {
    saveInProgress.current = false;
    setBusy(false);
  }
}
