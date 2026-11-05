import { useActionState } from 'react';

async function deleteConfirmedRoom(remove: () => Promise<void>) {
  if (!window.confirm('Excluir a sala? Os nomes, o progresso e as respostas serão apagados.'))
    return '';
  return remove().then(
    () => '',
    () => 'Não foi possível confirmar a exclusão da sala. Tente novamente.',
  );
}

export function useDeleteRoom(remove: () => Promise<void>) {
  const [error, action, pending] = useActionState(deleteConfirmedRoom.bind(null, remove), '');

  return {
    error,
    action,
    pending,
  };
}
