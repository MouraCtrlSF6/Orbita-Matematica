import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { Screen } from '../../../game/reducer';
import { ExpeditionMap } from '../../../features/map/ExpeditionMap/ExpeditionMap';

export function ExplorationScreen() {
  const { state, navigation, flightSession, settingsOpen } = useStudentGame();

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
