import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { ButtonVariant } from '../../../../../../../../../../../../components/Button/button-styles';
import { TooltipButton } from '../../../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import type { QuestionCreation } from '../../hooks/useQuestionCreation';

interface QuestionBackButtonProps {
  creation: QuestionCreation;
}

export function QuestionBackButton({ creation }: QuestionBackButtonProps) {
  if (!creation.open) return null;

  return (
    <TooltipButton
      variant={ButtonVariant.Ghost}
      className="size-11 p-0"
      aria-label="Voltar para a listagem de questões"
      onClick={creation.toggle}
    >
      <ArrowLeftIcon aria-hidden="true" className="size-5" />
    </TooltipButton>
  );
}
