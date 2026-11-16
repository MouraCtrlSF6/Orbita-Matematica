import { describe, expect, it } from 'vitest';
import { missions } from '../../../../content/missions';
import { initialSave } from '../../../../game/progress';
import { gameReducer } from '../reducer';
import { GameActionType, Screen, type GameState, type RoomDestination } from '../reducer-types';

function visit(destination: RoomDestination) {
  const state: GameState = {
    save: initialSave(),
    screen: Screen.Map,
    sectorId: null,
    missionId: null,
  };
  return gameReducer(state, { type: GameActionType.ResolveRoute, destination });
}

describe('student room routes', () => {
  const path = '/students/rooms/turma%20teste/sectors';

  it('opens an unlocked mission in its own sector', () => {
    const state = visit({
      key: `${path}/launch/missions/${missions[0].id}`,
      screen: Screen.Mission,
      sectorId: 'launch',
      missionId: missions[0].id,
    });
    expect(state).toMatchObject({
      screen: Screen.Mission,
      sectorId: 'launch',
      missionId: missions[0].id,
      save: { lastMissionId: missions[0].id },
    });
  });

  it.each([
    'missing',
    missions.find((mission) => mission.sectorId === 'workshop')!.id,
    missions[1].id,
  ])('returns to the sector for inaccessible mission %s', (missionId) => {
    const state = visit({
      key: path + '/launch/missions/' + missionId,
      screen: Screen.Mission,
      sectorId: 'launch',
      missionId,
    });
    expect(state).toMatchObject({ screen: Screen.Sector, sectorId: 'launch', missionId: null });
    expect(state.save).toEqual(initialSave());
  });

  it('returns to the map for a locked sector', () => {
    const state = visit({
      key: path + '/workshop',
      screen: Screen.Sector,
      sectorId: 'workshop',
    });
    expect(state).toMatchObject({ screen: Screen.Map, sectorId: null, missionId: null });
  });
});
