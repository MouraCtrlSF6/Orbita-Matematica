import { AddButton } from '../../../../../../../../../../../../components/AddButton/AddButton';
import type { QuestionHeaderProps } from '../QuestionHeader';
import { ReloadQuestionsButton } from './ReloadQuestionsButton/ReloadQuestionsButton';

export function QuestionListActions({
  pending,
  loading,
  ready,
  reload,
  creation,
}: QuestionHeaderProps) {
  return (
    <div hidden={creation.open} className="ml-auto shrink-0 space-x-2">
      <ReloadQuestionsButton pending={pending} loading={loading} reload={reload} />
      <AddButton
        tooltip="Adicionar questão"
        aria-label="Adicionar questão"
        aria-controls={creation.id}
        disabled={pending || !ready}
        onClick={creation.toggle}
      />
    </div>
  );
}
