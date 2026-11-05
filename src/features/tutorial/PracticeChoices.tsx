import type { TutorialPageProps } from './tutorial-view';
import { PracticeOption } from './PracticeOption';

interface PracticeChoicesProps {
  answer: TutorialPageProps['answer'];
  onAnswer: TutorialPageProps['onAnswer'];
}

export function PracticeChoices(props: PracticeChoicesProps) {
  return (
    <fieldset className="tutorial-choices [border:0] p-0 mt-[1.6875rem] mr-0 mb-[0.9375rem] ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3 flex flex-wrap gap-2.5 [&_label]:[flex:1] [&_label]:min-w-35">
      <legend>Escolha o total de cristais</legend>
      {['2', '4', '6'].map((value) => (
        <PracticeOption key={value} value={value} answer={props.answer} onAnswer={props.onAnswer} />
      ))}
    </fieldset>
  );
}
