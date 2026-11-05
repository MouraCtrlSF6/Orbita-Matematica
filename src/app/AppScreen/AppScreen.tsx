import { useStudentGame } from '../../pages/students/hooks/useStudentGame';
import { Screen } from '../../game/reducer';
import { ExplorationScreen } from './ExplorationScreen/ExplorationScreen';
import { TutorialScreen } from './TutorialScreen/TutorialScreen';
import { ActiveMissionScreen } from './ActiveMissionScreen/ActiveMissionScreen';
import { SummaryScreen } from './SummaryScreen/SummaryScreen';

const screens = {
  [Screen.Map]: ExplorationScreen,
  [Screen.Sector]: ExplorationScreen,
  [Screen.Tutorial]: TutorialScreen,
  [Screen.Mission]: ActiveMissionScreen,
  [Screen.Summary]: SummaryScreen,
};

export function AppScreen() {
  const { state } = useStudentGame();

  const Page = screens[state.screen];

  return <Page />;
}
