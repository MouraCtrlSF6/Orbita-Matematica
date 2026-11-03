import type { GameState } from '../game/reducer';
import { Screen } from '../game/reducer';
import { missionById } from '../content/missions';
import { ExpeditionMap } from '../features/map/ExpeditionMap';
import { MissionScreen } from '../features/mission/MissionScreen';
import { Tutorial } from '../features/tutorial/Tutorial';
import { Summary } from '../features/progress/Summary';
import { SettingsDialog } from '../features/settings/SettingsDialog';
import type { AppNavigation, FlightSession } from './app-navigation';
export interface AppScreenProps {
  state: GameState;
  navigation: AppNavigation;
  flightSession: FlightSession;
  settingsOpen: boolean;
}
function ExplorationScreen({ state, navigation, flightSession, settingsOpen }: AppScreenProps) {
  return (
    <ExpeditionMap
      key={flightSession.id}
      save={state.save}
      sectorId={state.screen === Screen.Sector ? state.sectorId : null}
      positions={flightSession.positions}
      paused={settingsOpen}
      onSector={navigation.enterSector}
      onUniverse={navigation.map}
      onStart={navigation.start}
      onTutorial={navigation.tutorial}
      onSummary={navigation.summary}
      onSoundChange={navigation.sound}
    />
  );
}
function TutorialScreen({ state, navigation, settingsOpen }: AppScreenProps) {
  return (
    <Tutorial
      reducedMotion={state.save.preferences.reducedMotion}
      soundEnabled={state.save.preferences.soundEnabled}
      paused={settingsOpen}
      onBack={navigation.map}
      onFinish={navigation.finishTutorial}
    />
  );
}
function ActiveMissionScreen({ state, navigation }: AppScreenProps) {
  const mission = missionById.get(state.missionId ?? '');
  if (!mission) return null;
  return (
    <MissionScreen
      key={mission.id}
      mission={mission}
      onBack={navigation.returnSector}
      onComplete={navigation.complete}
      onNext={navigation.returnSector}
    />
  );
}
function SummaryScreen({ state, navigation }: AppScreenProps) {
  return <Summary save={state.save} onBack={navigation.map} />;
}
const screens = {
  [Screen.Map]: ExplorationScreen,
  [Screen.Sector]: ExplorationScreen,
  [Screen.Tutorial]: TutorialScreen,
  [Screen.Mission]: ActiveMissionScreen,
  [Screen.Summary]: SummaryScreen,
};
export function AppScreen(props: AppScreenProps) {
  const Page = screens[props.state.screen];
  return <Page {...props} />;
}
export function SettingsOverlay({ state, navigation, settingsOpen }: AppScreenProps) {
  if (!settingsOpen) return null;
  return (
    <SettingsDialog
      preferences={state.save.preferences}
      onPreference={navigation.preference}
      onReset={navigation.reset}
      onClose={navigation.closeSettings}
    />
  );
}
