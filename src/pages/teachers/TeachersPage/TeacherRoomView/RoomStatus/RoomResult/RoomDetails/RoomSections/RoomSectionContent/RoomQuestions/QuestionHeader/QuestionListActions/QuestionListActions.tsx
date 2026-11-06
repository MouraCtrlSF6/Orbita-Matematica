import { ReloadIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../../../../../../../../components/Button/button-styles';
import { AddButton } from '../../../../../../../../../../../../components/AddButton/AddButton';
import type { QuestionHeaderProps } from '../QuestionHeader';

export function QuestionListActions({ pending, ready, reload, creation }: QuestionHeaderProps) {
  return (
    <div hidden={creation.open} className="ml-auto shrink-0 space-x-2">
      <TooltipButton
        variant={ButtonVariant.OutlinePrimary}
        className="size-11 p-0"
        aria-label="Recarregar questões"
        disabled={pending}
        onClick={reload}
      >
        <ReloadIcon aria-hidden="true" className="size-5" />
      </TooltipButton>
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
