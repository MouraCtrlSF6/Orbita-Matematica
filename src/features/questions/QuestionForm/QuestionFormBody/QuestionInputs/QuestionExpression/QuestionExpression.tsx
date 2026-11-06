import { ChallengeKind } from '../../../../../../game/types';
import { expressionFormula } from '../../../../../../game/question-authoring';
import { ExpressionEditor, type ExpressionEditorProps } from './ExpressionEditor/ExpressionEditor';

interface QuestionExpressionProps extends ExpressionEditorProps {
  kind: ChallengeKind;
}

export function QuestionExpression({ kind, ...props }: QuestionExpressionProps) {
  if (kind === ChallengeKind.Create) return null;
  return (
    <>
      <ExpressionEditor {...props} />
      <p>Expressão montada: {expressionFormula(props.value)}</p>
    </>
  );
}
