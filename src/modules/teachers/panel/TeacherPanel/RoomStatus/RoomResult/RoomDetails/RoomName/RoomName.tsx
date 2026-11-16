import { useTeacherSession } from '../../../../../../rooms/TeacherSession/hooks/useTeacherSession';

export function RoomName() {
  const { teacherRoomName } = useTeacherSession();

  return (
    <>
      <p>Compartilhe o nome da sala com a turma.</p>
      <p className="text-dialog-body">
        <strong>Nome da sala:</strong>{' '}
        <code className="font-bold text-primary">{teacherRoomName}</code>
      </p>
    </>
  );
}
