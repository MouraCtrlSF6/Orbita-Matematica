import { ObjectModel } from '../../../../../mission/ObjectModel/ObjectModel';
import type { TutorialPageProps } from '../../../tutorial-view';
import { NextStep } from '../NextStep/NextStep';

const variableExplanation = (
  <>
    <h2>Uma letra pode representar uma quantidade.</h2>
    <p>
      Cada robô precisa de 2 cristais. Chamamos a quantidade de robôs de <strong>x</strong>. O total
      de cristais é <strong>2 × x</strong>.
    </p>
  </>
);

const substitutionExample = (
  <p>
    Para 3 robôs, x = 3. Trocamos a letra pelo número: <strong>2 × 3 = 6</strong>.
  </p>
);

interface VariableLessonProps {
  onNext: TutorialPageProps['onNext'];
}

export function VariableLesson(props: VariableLessonProps) {
  return (
    <>
      {variableExplanation}
      <ObjectModel
        model={{
          groups: 3,
          perGroup: 2,
          extra: 0,
          label: 'cristais',
        }}
      />
      {substitutionExample}
      <NextStep onNext={props.onNext}>Agora é sua vez</NextStep>
    </>
  );
}
