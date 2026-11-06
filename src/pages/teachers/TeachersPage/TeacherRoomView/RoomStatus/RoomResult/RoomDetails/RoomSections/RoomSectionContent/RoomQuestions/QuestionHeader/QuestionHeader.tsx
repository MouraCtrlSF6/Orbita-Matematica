import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../../../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../../../components/Button/button-styles';
import { AddButton } from '../../../../../../../../../../../components/AddButton/AddButton';
import { Tooltip } from '../../../../../../../../../../../components/Tooltip/Tooltip';
import type { QuestionCreation } from '../hooks/useQuestionCreation';

interface QuestionHeaderProps {
  pending: boolean;
  ready: boolean;
  reload: () => void;
  creation: QuestionCreation;
}

export function QuestionHeader({ pending, ready, reload, creation }: QuestionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="m-0 min-w-0">Questões</h2>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Tooltip content="Recarregar questões">
          <Button
            variant={ButtonVariant.OutlinePrimary}
            className="size-11 p-0"
            aria-label="Recarregar questões"
            disabled={pending}
            onClick={reload}
          >
            <ReloadIcon aria-hidden="true" className="size-5" />
          </Button>
        </Tooltip>
        <AddButton
          tooltip={creation.open ? 'Recolher formulário de questão' : 'Adicionar questão'}
          aria-label="Adicionar questão"
          aria-expanded={creation.open}
          aria-controls={creation.id}
          disabled={pending || !ready}
          onClick={creation.toggle}
        />
      </div>
    </div>
  );
}

