import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { Summary } from '../../../features/progress/Summary/Summary';

export function SummaryScreen() {
  const { state, navigation } = useStudentGame();

  return <Summary save={state.save} onBack={navigation.map} />;
}
