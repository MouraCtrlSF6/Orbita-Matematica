import { useMemo } from 'react';
import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import { isMissionUnlocked, isSectorUnlocked, nextMission } from '../../game/progress';
import { approach, createWorld, type Point } from '../../game/space';
import type { SavedGame } from '../../game/types';
import { SpaceFlight, type DestinationStatus } from './SpaceFlight';

interface ExpeditionMapProps {
  save: SavedGame;
  sectorId: string | null;
  positions: Map<string, Point>;
  paused: boolean;
  onStart: (id: string) => void;
  onSector: (id: string) => void;
  onUniverse: () => void;
  onTutorial: () => void;
  onSummary: () => void;
}

export function ExpeditionMap({
  save,
  sectorId,
  positions,
  paused,
  onStart,
  onSector,
  onUniverse,
  onTutorial,
  onSummary,
}: ExpeditionMapProps) {
  const sector = sectors.find((item) => item.id === sectorId);
  const sectorMissions = missions.filter((item) => item.sectorId === sectorId);
  const next = missions.find((item) => item.id === nextMission(save))!;
  const world = useMemo(
    () =>
      createWorld(
        sectorId
          ? missions
              .filter((item) => item.sectorId === sectorId)
              .map((item) => ({ id: item.id, label: item.title }))
          : sectors.map((item) => ({ id: item.id, label: item.name })),
      ),
    [sectorId],
  );
  const statuses: Record<string, DestinationStatus> = Object.fromEntries(
    world.destinations.map((item) => {
      const items = sectorId
        ? [missions.find((mission) => mission.id === item.id)!]
        : missions.filter((mission) => mission.sectorId === item.id);
      const count = items.filter((mission) => save.completed[mission.id]).length;
      const unlocked = sectorId
        ? isMissionUnlocked(item.id, save.completed)
        : isSectorUnlocked(item.id, save.completed);
      return [
        item.id,
        {
          unlocked,
          completed: count === items.length,
          detail: !unlocked
            ? sectorId
              ? 'Conclua as missões anteriores'
              : 'Conclua o setor anterior'
            : sectorId
              ? count
                ? 'Concluída · você pode revisitar'
                : 'Disponível para explorar'
              : `${count} de ${items.length} missões · ${count === items.length ? 'Concluído' : 'Disponível'}`,
        },
      ];
    }),
  );
  const sectorComplete = !!sector && sectorMissions.every((item) => save.completed[item.id]);
  const allComplete = missions.every((item) => save.completed[item.id]);
  const nextSector = sector
    ? sectors[sectors.findIndex((item) => item.id === sector.id) + 1]
    : undefined;
  const nextId = sectorId
    ? sectorMissions.find((item) => !save.completed[item.id])?.id
    : allComplete
      ? undefined
      : next.sectorId;
  const mapKey = sectorId ?? 'universe';

  function resume() {
    if (!save.tutorialDone) {
      onTutorial();
      return;
    }
    if (!positions.has(next.sectorId)) {
      const sectorWorld = createWorld(
        missions
          .filter((item) => item.sectorId === next.sectorId)
          .map((item) => ({ id: item.id, label: item.title })),
      );
      positions.set(
        next.sectorId,
        approach(sectorWorld.destinations.find((item) => item.id === next.id)),
      );
    }
    onSector(next.sectorId);
  }

  return (
    <section className="exploration-screen" aria-labelledby="exploration-title">
      <div className="exploration-heading">
        <div>
          <p className="eyebrow">
            {sector
              ? `SETOR ${sector.number} · EXPLORAÇÃO LIVRE`
              : 'ÓRBITA MATEMÁTICA · EXPEDIÇÃO ESPACIAL'}
          </p>
          <h1 id="exploration-title">{sector?.name ?? 'O universo espera por você.'}</h1>
          <p>
            {sector?.description ?? 'Pilote sua nave. Encontre novos mundos. Descubra a álgebra.'}
          </p>
        </div>
        <span className="exploration-count">
          {Object.keys(save.completed).length} / {missions.length} descobertas
        </span>
      </div>
      <div className="exploration-toolbar">
        {sector ? (
          <button className="button flight-secondary" onClick={onUniverse}>
            ← Voltar ao universo
          </button>
        ) : (
          <button className="button flight-primary" onClick={resume}>
            {!save.tutorialDone
              ? 'Vamos explorar'
              : allComplete
                ? 'Explorar novamente'
                : 'Retomar exploração'}
          </button>
        )}
        <button className="button flight-secondary" onClick={onTutorial}>
          Como pilotar e jogar
        </button>
        <button className="button flight-secondary" onClick={onSummary}>
          Ver descobertas
        </button>
      </div>
      {sectorComplete ? (
        <div className="sector-celebration" role="status">
          <strong>✦ Setor concluído!</strong>
          <p>
            {nextSector
              ? `${nextSector.name} está disponível. Volte ao universo para viajar até lá.`
              : 'Você concluiu toda a expedição. Suas descobertas estão no diário.'}
          </p>
          {allComplete ? (
            <button className="button flight-primary" onClick={onSummary}>
              Ver minhas descobertas
            </button>
          ) : null}
        </div>
      ) : null}
      <SpaceFlight
        key={mapKey}
        world={world}
        statuses={statuses}
        nextId={nextId}
        initialPosition={positions.get(mapKey)}
        reducedMotion={save.preferences.reducedMotion}
        paused={paused}
        onPosition={(position) => positions.set(mapKey, position)}
        onVisit={(id) => {
          if (!save.tutorialDone) onTutorial();
          else if (sectorId) onStart(id);
          else onSector(id);
        }}
      />
      <p className="exploration-note">
        O ritmo é seu. Sem perder vidas, com pistas em cada descoberta.
      </p>
    </section>
  );
}
