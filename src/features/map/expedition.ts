import { missionById, missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import { isMissionUnlocked, isSectorUnlocked, nextMission } from '../../game/progress';
import { approach, createWorld, type Point, type SpaceWorld } from '../../game/space';
import type { SavedGame } from '../../game/types';
import type { DestinationStatus } from './flightController';
export interface ExpeditionMapProps {
  save: SavedGame;
  sectorId: string | null;
  positions: Map<string, Point>;
  paused: boolean;
  onStart: (id: string) => void;
  onSector: (id: string) => void;
  onUniverse: () => void;
  onTutorial: () => void;
  onSummary: () => void;
  onSoundChange: (enabled: boolean) => void;
}
function sectorMissions(id: string) {
  return missions.filter((item) => item.sectorId === id);
}

export function mapWorld(sectorId: string | null): SpaceWorld {
  if (sectorId)
    return createWorld(
      sectorMissions(sectorId).map((item) => ({ id: item.id, label: item.title })),
    );
  return createWorld(sectors.map((item) => ({ id: item.id, label: item.name })));
}

function missionStatus(id: string, save: SavedGame): DestinationStatus {
  const unlocked = isMissionUnlocked(id, save.completed);

  const completed = Boolean(save.completed[id]);

  const detail = completed ? 'Concluída · você pode revisitar' : 'Disponível para explorar';

  return {
    unlocked,
    completed,
    detail: unlocked ? detail : 'Conclua as missões anteriores',
  };
}

function sectorStatus(id: string, save: SavedGame): DestinationStatus {
  const items = sectorMissions(id);

  const count = items.filter((item) => save.completed[item.id]).length;

  const unlocked = isSectorUnlocked(id, save.completed);

  const completed = count === items.length;

  const detail = `${count} de ${items.length} missões · ${completed ? 'Concluído' : 'Disponível'}`;

  return {
    unlocked,
    completed,
    detail: unlocked ? detail : 'Conclua o setor anterior',
  };
}

export class Expedition {
  constructor(
    readonly props: ExpeditionMapProps,
    readonly world: SpaceWorld,
  ) {}
  get sector() {
    return sectors.find((item) => item.id === this.props.sectorId);
  }
  get nextMission() {
    return missionById.get(nextMission(this.props.save))!;
  }
  get allComplete() {
    return missions.every((item) => this.props.save.completed[item.id]);
  }
  get sectorComplete() {
    return (
      Boolean(this.sector) &&
      sectorMissions(this.props.sectorId!).every((item) => this.props.save.completed[item.id])
    );
  }
  get mapKey() {
    return this.props.sectorId ?? 'universe';
  }
  get statuses(): Record<string, DestinationStatus> {
    const status = this.props.sectorId ? missionStatus : sectorStatus;

    return Object.fromEntries(
      this.world.destinations.map((item) => [item.id, status(item.id, this.props.save)]),
    );
  }
  get nextSector() {
    if (!this.sector) return undefined;
    return sectors[sectors.findIndex((item) => item.id === this.sector!.id) + 1];
  }
  get nextId() {
    if (this.props.sectorId)
      return sectorMissions(this.props.sectorId).find((item) => !this.props.save.completed[item.id])
        ?.id;
    return this.allComplete ? undefined : this.nextMission.sectorId;
  }
  get resumeLabel() {
    if (!this.props.save.tutorialDone) return 'Vamos explorar';
    return this.allComplete ? 'Explorar novamente' : 'Retomar exploração';
  }
  private ensurePosition() {
    const next = this.nextMission;

    if (this.props.positions.has(next.sectorId)) return;
    const world = mapWorld(next.sectorId);

    this.props.positions.set(
      next.sectorId,
      approach(world.destinations.find((item) => item.id === next.id)),
    );
  }

  resume = () => {
    if (!this.props.save.tutorialDone) {
      this.props.onTutorial();
      return;
    }
    this.ensurePosition();
    this.props.onSector(this.nextMission.sectorId);
  };
  visit = (id: string) => {
    if (!this.props.save.tutorialDone) this.props.onTutorial();
    else if (this.props.sectorId) this.props.onStart(id);
    else this.props.onSector(id);
  };
  rememberPosition = (position: Point) => this.props.positions.set(this.mapKey, position);
}
