import { useStudentGame } from '../../../../hooks/useStudentGame';
import { useRef } from 'react';
import { useMainFocus } from './hooks/useMainFocus';
import { RoomSyncStatus } from './RoomSyncStatus/RoomSyncStatus';
import { PageFooter } from '../../../../../../app/PageFooter/PageFooter';
import { StorageWarning } from '../../../../../../app/StorageWarning/StorageWarning';
import { AppScreen } from '../../../../../../app/AppScreen/AppScreen';

export function AppContent() {
  const { state, storageAvailable, room } = useStudentGame();

  const mainRef = useRef<HTMLElement>(null);

  useMainFocus(state, mainRef);
  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <StorageWarning available={storageAvailable} />
      <RoomSyncStatus room={room} />
      <AppScreen />
      <PageFooter />
    </main>
  );
}
