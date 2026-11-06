import { useSession } from '../../../../../../../../../../../app/contexts/hooks/useSession';
import {
  appendRoomMission,
  removeRoomMission,
} from '../../../../../../../../../../../game/room-catalog';
import type { Mission } from '../../../../../../../../../../../game/types';
import { useCatalogLoad } from './useCatalogLoad';
import { useCatalogWrite } from './useCatalogWrite';

export function useRoomQuestions() {
  const { localSessionId } = useSession();
  const load = useCatalogLoad(localSessionId);
  const write = useCatalogWrite(localSessionId, load.snapshot, load.setSnapshot);
  const operations = roomOperations(load.snapshot, write.save);

  return {
    snapshot: load.snapshot,
    error: write.error || load.error,
    message: write.message,
    pending: write.pending,
    ...operations,
    reload: () => {
      write.clear();
      load.reload();
    },
  };
}

function roomOperations(
  snapshot: ReturnType<typeof useCatalogLoad>['snapshot'],
  save: ReturnType<typeof useCatalogWrite>['save'],
) {
  return {
    add: (mission: Mission) =>
      snapshot
        ? save(appendRoomMission(snapshot.catalog, mission), 'Questão adicionada.')
        : Promise.resolve(false),
    remove: removeQuestion.bind(null, snapshot, save),
  };
}

function removeQuestion(
  snapshot: ReturnType<typeof useCatalogLoad>['snapshot'],
  save: ReturnType<typeof useCatalogWrite>['save'],
  id: string,
) {
  if (!snapshot) return Promise.resolve(false);
  return save(removeRoomMission(snapshot.catalog, id), 'Questão excluída.');
}
