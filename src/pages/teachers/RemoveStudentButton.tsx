import { useActionState } from 'react';
import { useSession } from '../../app/contexts/hooks/useSession';
import { removeStudent } from '../../infrastructure/firebase/rooms';

async function removeConfirmedStudent(roomId: string, studentId: string, name: string) {
  if (
    !window.confirm(
      `Remover ${name} da sala? O registro será apagado e o jogo continuará aberto para o aluno.`,
    )
  )
    return '';
  return removeStudent(roomId, studentId).then(
    () => '',
    () => 'Não foi possível remover o aluno. Tente novamente.',
  );
}

export function RemoveStudentButton({ studentId, name }: { studentId: string; name: string }) {
  const { localSessionId } = useSession();
  const [error, action, pending] = useActionState(
    removeConfirmedStudent.bind(null, localSessionId, studentId, name),
    '',
  );
  return (
    <form action={action}>
      <button
        className="button danger min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-danger:bg-danger ds-danger:text-white ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        disabled={pending}
        aria-label={`Remover ${name} da sala`}
      >
        {pending ? 'Removendo…' : 'Remover aluno'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
