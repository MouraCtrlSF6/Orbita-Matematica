import type { ProgressStatus } from '../../../../../../../../../../../../game/room-progress';
import { statusLabels } from '../statusLabels';

const statusStyles = {
  completed: 'text-lime-600',
  in_progress: 'text-amber-600',
  not_started: 'text-black',
};

interface ProgressStatusLabelProps {
  status: ProgressStatus;
}

export function ProgressStatusLabel({ status }: ProgressStatusLabelProps) {
  return <span className={`shrink-0 ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}
