import { useActionState } from 'react';

async function deleteConfirmedRoom(remove: () => Promise<void>) {
  if (!window.confirm('Excluir a sala? Os nomes, o progresso e as respostas serão apagados.'))
    return '';
  return remove().then(
    () => '',
    () => 'Não foi possível confirmar a exclusão da sala. Tente novamente.',
  );
}

function DeleteButton({ pending }: { pending: boolean }) {
  return (
    <button className="button danger" disabled={pending}>
      {pending ? 'Excluindo…' : 'Excluir sala'}
    </button>
  );
}

export function DeleteRoomButton({ remove }: { remove: () => Promise<void> }) {
  const [error, action, pending] = useActionState(deleteConfirmedRoom.bind(null, remove), '');
  return (
    <form action={action}>
      <DeleteButton pending={pending} />
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
