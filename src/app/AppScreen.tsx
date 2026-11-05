import { useStudentGame } from '../pages/students/hooks/useStudentGame';
import { Screen } from '../game/reducer';
import { ExplorationScreen } from './ExplorationScreen';
import { TutorialScreen } from './TutorialScreen';
import { ActiveMissionScreen } from './ActiveMissionScreen';
import { SummaryScreen } from './SummaryScreen';

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
