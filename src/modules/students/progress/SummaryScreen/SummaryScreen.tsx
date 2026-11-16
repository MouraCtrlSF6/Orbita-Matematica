import { useStudentGame } from '../../session/hooks/useStudentGame';
import { Summary } from '../Summary/Summary';

export function SummaryScreen() {
  const { state, navigation } = useStudentGame();

  return <Summary save={state.save} onBack={navigation.map} />;
}
