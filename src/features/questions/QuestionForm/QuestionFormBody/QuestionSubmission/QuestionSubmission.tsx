import { Button } from '../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
interface QuestionSubmissionProps {
  error: string;
}

export function QuestionSubmission({ error }: QuestionSubmissionProps) {
  return (
    <>
      <p>Confira o resultado, as dicas e a representação visual antes de adicionar.</p>
      {error && <p role="alert">{error}</p>}
      <Button
        variant={ButtonVariant.Primary}
        type="submit"
        aria-label="Adicionar questão à sala"
        className="justify-self-end ds-down-mobile:w-full"
      >
        Adicionar questão
      </Button>
    </>
  );
}
