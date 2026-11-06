import { PlusIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
import { Spinner } from '../../../../../components/Spinner/Spinner';

interface QuestionSubmissionProps {
  error: string;
  pending: boolean;
}

const loadingLabel = <Spinner label="Adicionando questão…" />;
const idleLabel = (
  <>
    <PlusIcon aria-hidden="true" className="size-5 shrink-0" />
    Adicionar questão
  </>
);

export function QuestionSubmission({ error, pending }: QuestionSubmissionProps) {
  return (
    <>
      <p>Confira o resultado, as dicas e a representação visual antes de adicionar.</p>
      {error && <p role="alert">{error}</p>}
      <TooltipButton
        type="submit"
        variant={ButtonVariant.Addition}
        aria-label="Adicionar questão à sala"
        aria-busy={pending}
        disabled={pending}
        className="justify-self-end text-amber-700 ds-down-mobile:w-full"
      >
        {pending ? loadingLabel : idleLabel}
      </TooltipButton>
    </>
  );
}
