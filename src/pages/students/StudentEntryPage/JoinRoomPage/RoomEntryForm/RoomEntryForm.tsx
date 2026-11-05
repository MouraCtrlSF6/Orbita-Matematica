import { useJoinRoom } from './hooks/useJoinRoom';
import { roomNameMaxLength } from '../../../../../game/room-name';
import { JoinButton } from './JoinButton/JoinButton';

const roomNameField = (
  <>
    <label htmlFor="room-name">Nome da sala</label>
    <input id="room-name" name="roomName" required maxLength={roomNameMaxLength} />
  </>
);

const nameField = (
  <>
    <label htmlFor="student-name">Nome completo</label>
    <input id="student-name" name="studentName" required maxLength={100} autoComplete="off" />
    <label className="room-resume flex items-center gap-2">
      <input type="checkbox" name="resume" /> Continuar meu progresso desta aba nesta sala
    </label>
  </>
);

export function RoomEntryForm() {
  const { joinRoom, joining, error } = useJoinRoom();

  return (
    <form
      className="room-entry-form grid gap-3 [width:min(100%,_26.25rem)] text-left [&_input:not([type='checkbox'])]:w-full [&_input:not([type='checkbox'])]:min-h-11 [&_input:not([type='checkbox'])]:py-2 [&_input:not([type='checkbox'])]:px-3 [&_input:not([type='checkbox'])]:[border:1px_solid_#7560a8] [&_input:not([type='checkbox'])]:rounded-control"
      action={joinRoom}
    >
      {roomNameField}
      {nameField}
      <JoinButton joining={joining} />
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
