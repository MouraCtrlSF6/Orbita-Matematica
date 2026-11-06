import type { ReportSnapshot } from '../../game/report-types';

export interface ReportRequest {
  snapshot: ReportSnapshot;
}
export type ReportResponse = { status: 'ready'; blob: Blob } | { status: 'error'; message: string };
