import { ReloadIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../../../../../../../../../components/Button/button-styles';
import { Spinner } from '../../../../../../../../../../../../../components/Spinner/Spinner';

interface ReloadQuestionsButtonProps {
  pending: boolean;
  loading: boolean;
  reload: () => void;
}

const idleIcon = <ReloadIcon aria-hidden="true" className="size-5" />;
const loadingIcon = <Spinner label="Carregando questões…" size="1.25rem" />;

export function ReloadQuestionsButton({ pending, loading, reload }: ReloadQuestionsButtonProps) {
  return (
    <TooltipButton
      variant={ButtonVariant.OutlinePrimary}
      className="size-11 p-0"
      aria-label="Recarregar questões"
      aria-busy={loading}
      disabled={pending || loading}
      onClick={reload}
    >
      {loading ? loadingIcon : idleIcon}
    </TooltipButton>
  );
}
