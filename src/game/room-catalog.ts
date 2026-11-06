import { validateExpression } from './token-expression';
import { missionById, missions } from '../content/missions';
import { sectors } from '../content/sectors';
import { validateAuthoredMission } from './question-authoring';
import { isMission } from '../content/mission-catalog';
import { isRecord } from './validation';
import type { Mission } from './types';

export interface RoomCatalog {
  revision: number;
  missions: Mission[];
}

export interface StoredRoomCatalog {
  revision: number;
  sectors: Record<string, string>;
}

export function defaultRoomCatalog(): RoomCatalog {
  return { revision: 0, missions: structuredClone(missions) };
}

export function storeRoomCatalog(catalog: RoomCatalog): StoredRoomCatalog {
  return {
    revision: catalog.revision,
    sectors: Object.fromEntries(
      sectors.map((sector) => [
        sector.id,
        JSON.stringify(catalog.missions.filter((mission) => mission.sectorId === sector.id)),
      ]),
    ),
  };
}

function parseSectorItems(value: unknown): unknown[] {
  requireSectorText(value);
  const items: unknown = JSON.parse(value);

  if (!Array.isArray(items) || items.length > 200) throw new Error('Questões inválidas.');
  return items;
}

function readSectorMission(item: unknown, sectorId: string): Mission {
  if (!isMission(item) || item.sectorId !== sectorId) throw new Error('Questão inválida.');
  return validatePlayableMission(item);
}

function readSector(value: unknown, sectorId: string): Mission[] {
  return parseSectorItems(value).map((item) => readSectorMission(item, sectorId));
}

function readSectors(value: unknown): Mission[] {
  if (!isRecord(value) || Object.keys(value).length !== sectors.length)
    throw new Error('Setores inválidos.');
  return sectors.flatMap((sector) => readSector(value[sector.id], sector.id));
}

function requireRevision(
  value: unknown,
): asserts value is Record<string, unknown> & { revision: number } {
  if (!isRecord(value)) throw new Error('Catálogo inválido.');
  if (!Number.isSafeInteger(value.revision) || Number(value.revision) < 0)
    throw new Error('Revisão inválida.');
}

function requireMissionIds(items: Mission[]) {
  const ids = new Set(items.map((mission) => mission.id));

  if (ids.size !== items.length) throw new Error('Identificadores duplicados.');
  if (items.some((mission) => !isCatalogId(mission.id)))
    throw new Error('Identificadores inválidos.');
}

export function parseRoomCatalog(value: unknown): RoomCatalog {
  if (value === null) return defaultRoomCatalog();
  requireRevision(value);
  const items = readSectors(value.sectors);

  requireMissionIds(items);
  return { revision: value.revision, missions: items };
}

export function appendRoomMission(catalog: RoomCatalog, mission: Mission): RoomCatalog {
  const items = [...catalog.missions, mission];

  return {
    revision: catalog.revision + 1,
    missions: sectors.flatMap((sector) => items.filter((item) => item.sectorId === sector.id)),
  };
}

export function removeRoomMission(catalog: RoomCatalog, id: string): RoomCatalog {
  return {
    revision: catalog.revision + 1,
    missions: catalog.missions.filter((item) => item.id !== id),
  };
}

function requireSectorText(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.length > 500_000) throw new Error('Setor inválido.');
}

function validatePlayableMission(item: Mission) {
  if (item.expression) validateExpression(item.expression);
  return item.id.startsWith('custom-') ? validateAuthoredMission(item) : item;
}

function isCatalogId(id: string) {
  return missionById.has(id) || /^custom-[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(id);
}
