import type { Mission } from '../../../game/types';
import { QuestionFormBody } from './QuestionFormBody/QuestionFormBody';

export interface QuestionFormProps {
  add: (mission: Mission) => Promise<boolean>;
  pending: boolean;
}

export function QuestionForm(props: QuestionFormProps) {
  return (
    <details className="border border-line bg-white rounded-card p-6 ds-down-mobile:p-4">
      <summary>Adicionar questão</summary>
      <QuestionFormBody {...props} />
    </details>
  );
}
