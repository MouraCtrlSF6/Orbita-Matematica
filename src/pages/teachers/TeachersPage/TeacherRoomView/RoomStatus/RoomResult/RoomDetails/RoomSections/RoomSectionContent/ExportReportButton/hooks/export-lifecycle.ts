import type { MutableRefObject } from 'react';
import { loadRoomCatalog } from '../../../../../../../../../../../infrastructure/firebase/room-catalog';
import type { ReportSnapshot } from '../../../../../../../../../../../game/report-types';
import type { ReportResponse } from '../../../../../../../../../../../features/room-report/report-worker-types';
import { downloadReport } from '../../../../../../../../../../../features/room-report/download-report';

interface ExportTask {
  controller: AbortController;
  worker?: Worker;
}
export interface ExportLifecycle {
  active: MutableRefObject<ExportTask | null>;
  pending: (value: boolean) => void;
  failed: () => void;
}
export function cancelExport(active: ExportLifecycle['active']) {
  active.current?.controller.abort();
  active.current?.worker?.terminate();
  active.current = null;
}
function finish(lifecycle: ExportLifecycle) {
  cancelExport(lifecycle.active);
  lifecycle.pending(false);
}
function failure(lifecycle: ExportLifecycle) {
  if (!lifecycle.active.current) return;
  finish(lifecycle);
  lifecycle.failed();
}
function receive(
  event: MessageEvent<ReportResponse>,
  lifecycle: ExportLifecycle,
  snapshot: ReportSnapshot,
) {
  if (!lifecycle.active.current) return;
  if (event.data.status === 'error') return failure(lifecycle);
  try {
    downloadReport(event.data.blob, snapshot);
    finish(lifecycle);
  } catch {
    failure(lifecycle);
  }
}
function startWorker(snapshot: ReportSnapshot, lifecycle: ExportLifecycle) {
  const worker = new Worker(
    new URL(
      '../../../../../../../../../../../features/room-report/report.worker.tsx',
      import.meta.url,
    ),
    { type: 'module' },
  );
  lifecycle.active.current!.worker = worker;
  worker.onerror = () => failure(lifecycle);
  worker.onmessage = (event: MessageEvent<ReportResponse>) => receive(event, lifecycle, snapshot);
  worker.postMessage({ snapshot });
}
async function prepare(
  snapshot: Omit<ReportSnapshot, 'catalog'>,
  lifecycle: ExportLifecycle,
  task: ExportTask,
) {
  try {
    const { catalog } = await loadRoomCatalog(snapshot.roomId, task.controller.signal);
    if (task.controller.signal.aborted) return;
    startWorker({ ...snapshot, catalog }, lifecycle);
  } catch {
    failure(lifecycle);
  }
}
export function beginExport(snapshot: Omit<ReportSnapshot, 'catalog'>, lifecycle: ExportLifecycle) {
  if (lifecycle.active.current) return;
  const task = { controller: new AbortController() };
  lifecycle.active.current = task;
  lifecycle.pending(true);
  void prepare(snapshot, lifecycle, task);
}
