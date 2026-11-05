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
    <button
      className="button danger min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-danger:bg-danger ds-danger:text-white ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      disabled={pending}
    >
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
