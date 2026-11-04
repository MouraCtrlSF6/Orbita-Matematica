import { useSyncExternalStore } from 'react';
import type { StudentRoom } from './room-sync';

const messages = {
  synced: '',
  pending: 'Enviando atualizações da sala…',
  retrying: 'Há atualizações pendentes. O jogo vai tentar enviá-las novamente.',
  stopped: 'O envio para a sala foi interrompido. Você pode continuar jogando neste navegador.',
};

export function RoomSyncStatus({ room }: { room: StudentRoom }) {
  const status = useSyncExternalStore(room.writes.subscribe, room.writes.getStatus);
  return (
    <p role="status" className="room-sync-status" hidden={status === 'synced'}>
      {messages[status]}
    </p>
  );
}
