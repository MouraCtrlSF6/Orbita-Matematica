import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from './ReportDocument/ReportDocument';
import type { ReportRequest, ReportResponse } from './report-worker-types';

self.onmessage = async (event: MessageEvent<ReportRequest>) => {
  try {
    const blob = await pdf(<ReportDocument snapshot={event.data.snapshot} />).toBlob();
    const response: ReportResponse = { status: 'ready', blob };

    self.postMessage(response);
  } catch {
    const response: ReportResponse = {
      status: 'error',
      message: 'Não foi possível gerar o PDF. Tente novamente.',
    };

    self.postMessage(response);
  }
};
