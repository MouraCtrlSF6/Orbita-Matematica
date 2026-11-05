import { useCreateRoom } from './hooks/useCreateRoom';
import { roomNameMaxLength } from '../../game/room-name';

const nameField = (
  <>
    <label htmlFor="teacher-room-name">Nome da sala</label>
    <input id="teacher-room-name" name="roomName" required maxLength={roomNameMaxLength} />
  </>
);

export function CreateRoomForm() {
  const { error, action, pending } = useCreateRoom();

  return (
    <form
      className="create-room-form grid gap-3 [width:min(100%,_26.25rem)] text-left [&_input]:w-full [&_input]:min-h-11 [&_input]:py-2 [&_input]:px-3 [&_input]:[border:1px_solid_#7560a8] [&_input]:rounded-control"
      action={action}
    >
      {nameField}
      <button
        className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        disabled={pending}
      >
        {pending ? 'Criando…' : 'Criar sala'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
