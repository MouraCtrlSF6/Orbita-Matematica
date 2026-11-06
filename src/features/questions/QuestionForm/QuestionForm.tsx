import type { Mission } from '../../../game/types';
import { QuestionFormBody } from './QuestionFormBody/QuestionFormBody';

export interface QuestionFormProps {
  add: (mission: Mission) => Promise<boolean>;
  pending: boolean;
  id?: string;
  open?: boolean;
}

export function QuestionForm({ id, open = true, ...props }: QuestionFormProps) {
  return (
    <section
      id={id}
      hidden={!open}
      aria-label="Adicionar questão"
      className="border border-line bg-white rounded-card p-6 ds-down-mobile:p-4"
    >
      <h3>Adicionar questão</h3>
      <QuestionFormBody {...props} />
    </section>
  );
}
