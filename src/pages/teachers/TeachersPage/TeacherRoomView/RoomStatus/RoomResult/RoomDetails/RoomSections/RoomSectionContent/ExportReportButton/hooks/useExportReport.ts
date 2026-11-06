import { useEffect, useRef, useState } from 'react';
import { useSession } from '../../../../../../../../../../../app/contexts/hooks/useSession';
import { useToast } from '../../../../../../../../../../../components/Toast/hooks/useToast';
import { ToastVariant } from '../../../../../../../../../../../components/Toast/toast-styles';
import type { RoomStudent } from '../../../../../../../../../../../game/room-progress';
import { beginExport, cancelExport, type ExportLifecycle } from './export-lifecycle';

export function useExportReport(students: RoomStudent[]) {
  const session = useSession();
  const notify = useToast();
  const [pending, setPending] = useState(false);
  const active = useRef<ExportLifecycle['active']['current']>(null);
  const failed = () => notify('Não foi possível gerar o PDF. Tente novamente.', ToastVariant.Error);
  const generate = () =>
    beginExport(
      {
        roomId: session.localSessionId,
        roomName: session.teacherRoomName ?? 'Sala',
        generatedAt: new Date().toISOString(),
        students: structuredClone(students),
      },
      { active, pending: setPending, failed },
    );

  useEffect(() => () => cancelExport(active), []);
  return { pending, generate };
}
