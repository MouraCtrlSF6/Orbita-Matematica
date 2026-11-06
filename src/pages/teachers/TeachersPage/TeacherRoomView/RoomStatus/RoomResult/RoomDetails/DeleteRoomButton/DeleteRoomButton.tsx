import { useDeleteRoom } from './hooks/useDeleteRoom';
import { DeleteButton } from './DeleteButton/DeleteButton';

export interface DeleteRoomButtonProps {
  remove: () => Promise<void>;
}

export function DeleteRoomButton({ remove }: DeleteRoomButtonProps) {
  const { error, action, pending } = useDeleteRoom(remove);

  return (
    <form action={action} className="w-full max-w-[64rem] text-right">
      <DeleteButton pending={pending} />
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
