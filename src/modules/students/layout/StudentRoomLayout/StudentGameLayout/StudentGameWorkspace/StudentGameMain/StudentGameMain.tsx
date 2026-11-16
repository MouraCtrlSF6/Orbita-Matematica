import { useStudentGame } from '../../../../../session/hooks/useStudentGame';
import { useLocation } from 'react-router';
import { useRef, type ReactNode } from 'react';
import { useMainFocus } from './hooks/useMainFocus';
import { RoomSyncStatus } from './RoomSyncStatus/RoomSyncStatus';
import { PageFooter } from './PageFooter/PageFooter';
import { StorageWarning } from './StorageWarning/StorageWarning';

interface StudentGameMainProps {
  children: ReactNode;
}

export function StudentGameMain({ children }: StudentGameMainProps) {
  const { storageAvailable, room } = useStudentGame();

  const mainRef = useRef<HTMLElement>(null);

  const { pathname } = useLocation();

  useMainFocus(pathname, mainRef);
  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <StorageWarning available={storageAvailable} />
      <RoomSyncStatus room={room} />
      {children}
      <PageFooter />
    </main>
  );
}
