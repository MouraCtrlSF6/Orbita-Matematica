import { AddButton } from '../../../../../components/AddButton/AddButton';
interface QuestionSubmissionProps {
  error: string;
}

export function QuestionSubmission({ error }: QuestionSubmissionProps) {
  return (
    <>
      <p>Confira o resultado, as dicas e a representação visual antes de adicionar.</p>
      {error && <p role="alert">{error}</p>}
      <AddButton
        type="submit"
        aria-label="Adicionar questão à sala"
        className="justify-self-end ds-down-mobile:w-full"
      >
        Adicionar questão
      </AddButton>
    </>
  );
}
