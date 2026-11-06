import { ExportButtonContent } from './ExportButtonContent/ExportButtonContent';
import { Button } from '../../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../../components/Button/button-styles';
import { Tooltip } from '../../../../../../../../../../components/Tooltip/Tooltip';
import type { RoomStudent } from '../../../../../../../../../../game/room-progress';
import { useExportReport } from './hooks/useExportReport';

interface ExportReportButtonProps {
  students: RoomStudent[];
}

export function ExportReportButton({ students }: ExportReportButtonProps) {
  const report = useExportReport(students);

  return (
    <Tooltip content="Exportar relatório da sala, dos setores e dos alunos em PDF">
      <span tabIndex={report.pending ? 0 : undefined}>
        <Button
          variant={ButtonVariant.OutlinePrimary}
          disabled={report.pending}
          aria-busy={report.pending}
          onClick={report.generate}
        >
          <ExportButtonContent pending={report.pending} />
        </Button>
      </span>
    </Tooltip>
  );
}
