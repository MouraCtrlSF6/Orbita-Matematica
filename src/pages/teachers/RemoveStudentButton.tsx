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
      <button className="button danger" disabled={pending} aria-label={`Remover ${name} da sala`}>
        {pending ? 'Removendo…' : 'Remover aluno'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
