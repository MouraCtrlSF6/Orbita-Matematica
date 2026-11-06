import { useCreateRoom } from './hooks/useCreateRoom';
import { roomNameMaxLength } from '../../../../../game/room-name';
import { Button } from '../../../../../components/Button/Button';
import { Input } from '../../../../../components/Input/Input';

const nameField = (
  <>
    <label htmlFor="teacher-room-name">Nome da sala</label>
    <Input id="teacher-room-name" name="roomName" required maxLength={roomNameMaxLength} />
  </>
);

export function CreateRoomForm() {
  const { error, action, pending } = useCreateRoom();

  return (
    <form
      className="create-room-form grid gap-3 [width:min(100%,_26.25rem)] text-left"
      action={action}
    >
      {nameField}
      <Button type="submit" disabled={pending}>
        {pending ? 'Criando…' : 'Criar sala'}
      </Button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
