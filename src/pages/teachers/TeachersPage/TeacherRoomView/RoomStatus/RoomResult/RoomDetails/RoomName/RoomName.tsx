import { useSession } from '../../../../../../../../app/contexts/hooks/useSession';

export function RoomName() {
  const { teacherRoomName } = useSession();

  return (
    <>
      <p>Compartilhe o nome da sala com a turma.</p>
      <p className="text-dialog-body">
        <strong>Nome da sala:</strong> <code>{teacherRoomName}</code>
      </p>
    </>
  );
}
