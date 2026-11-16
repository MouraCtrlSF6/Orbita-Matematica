import { useStudentGame } from '../../session/hooks/useStudentGame';
import { Screen } from '../../session/reducer-types';
import { ExpeditionMap } from '../ExpeditionMap/ExpeditionMap';

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
      onSummary={navigation.summary}
      onSoundChange={navigation.sound}
    />
  );
}
