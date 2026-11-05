import { describe, expect, it } from 'vitest';
import { missions } from '../content/missions';
import {
  defaultRoomCatalog,
  storeRoomCatalog,
  parseRoomCatalog,
  appendRoomMission,
  removeRoomMission,
} from './room-catalog';
import { initialSave, isSectorUnlocked, nextMission } from './progress';
import { gameReducer, Screen, type GameState } from './reducer';
import { parseSave } from '../infrastructure/storage';
import { mapWorld } from '../features/map/ExpeditionMap/expedition';

describe('room catalog snapshots', () => {
  it('loads defaults for legacy rooms and preserves all fields through Firebase serialization', () => {
    expect(parseRoomCatalog(null).missions).toEqual(missions);
    expect(parseRoomCatalog(storeRoomCatalog(defaultRoomCatalog()))).toEqual(defaultRoomCatalog());
  });

  it('isolates changes between rooms, keeps IDs, and appends to the selected sector', () => {
    const first = defaultRoomCatalog();
    const second = defaultRoomCatalog();
    const mission = { ...missions[0], id: 'custom-11111111-1111-4111-8111-111111111111' };
    const changed = appendRoomMission(removeRoomMission(first, missions[0].id), mission);

    expect(second.missions).toEqual(missions);
    expect(changed.revision).toBe(2);
    expect(changed.missions.filter((item) => item.sectorId === 'launch').at(-1)).toEqual(mission);
    expect(changed.missions.some((item) => item.id === missions[0].id)).toBe(false);
  });

  it('supports empty sectors and a completely empty catalog', () => {
    const empty = { revision: 1, missions: [] };

    expect(parseRoomCatalog(storeRoomCatalog(empty))).toEqual(empty);
    expect(isSectorUnlocked('base', {}, [])).toBe(true);
    expect(isSectorUnlocked('unknown', {}, [])).toBe(false);
    expect(nextMission(initialSave(), [])).toBe('');
    expect(mapWorld('launch', []).destinations).toEqual([]);
  });

  it.each([
    { revision: -1, sectors: {} },
    { revision: 0, sectors: { launch: '[]', workshop: '[]', base: '[]', extra: '[]' } },
    { revision: 0, sectors: { launch: 'invalid', workshop: '[]', base: '[]' } },
    {
      revision: 0,
      sectors: { launch: JSON.stringify([missions[0], missions[0]]), workshop: '[]', base: '[]' },
    },
    {
      revision: 0,
      sectors: {
        launch: JSON.stringify([{ ...missions[0], sectorId: 'base' }]),
        workshop: '[]',
        base: '[]',
      },
    },
  ])('rejects invalid remote catalog %j', (value) => {
    expect(() => parseRoomCatalog(value)).toThrow();
  });

  it('uses the supplied catalog for unlocking and preserves custom completions', () => {
    const mission = { ...missions[0], id: 'custom-11111111-1111-4111-8111-111111111111' };
    const state: GameState = {
      save: { ...initialSave(), tutorialDone: true },
      screen: Screen.Map,
      missionId: null,
      sectorId: null,
    };
    const started = gameReducer(state, { type: 'start', id: mission.id }, [mission]);
    const result = { hints: 0, visual: false, attempts: 1, guided: false };
    const completed = gameReducer(started, { type: 'complete', result }, [mission]);

    expect(started.missionId).toBe(mission.id);
    expect(completed.save.completed[mission.id]).toEqual(result);
    expect(parseSave(JSON.stringify(completed.save), [mission]).completed[mission.id]).toEqual(
      result,
    );
    expect(parseSave(JSON.stringify(completed.save), []).completed[mission.id]).toEqual(result);
    expect(gameReducer(state, { type: 'start', id: missions[1].id }, [mission])).toEqual(state);
  });
});
