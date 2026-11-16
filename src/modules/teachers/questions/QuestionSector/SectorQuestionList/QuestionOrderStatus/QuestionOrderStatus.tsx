import { QuestionOrderOverlay } from '../QuestionOrderOverlay/QuestionOrderOverlay';

interface QuestionOrderStatusProps {
  saving: boolean;
  message: string;
}

export function QuestionOrderStatus({ saving, message }: QuestionOrderStatusProps) {
  return (
    <>
      {' '}
      <QuestionOrderOverlay open={saving} />
      <p className="text-small text-muted">
        Arraste pela alça à esquerda para reordenar. A ordem é salva ao soltar.
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>
    </>
  );
}
