import { useEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { IconName } from '../components/icon-names';
import { missionById } from '../content/missions';
import { Screen } from '../game/reducer';
import type { Point } from '../game/space';
import { ExpeditionMap } from '../features/map/ExpeditionMap';
import { MissionScreen } from '../features/mission/MissionScreen';
import { Tutorial } from '../features/tutorial/Tutorial';
import { Summary } from '../features/progress/Summary';
import { SettingsDialog } from '../features/settings/SettingsDialog';
import { useGame } from './useGame';

export function App() {
  const { state, dispatch, storageAvailable } = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [flightSession, setFlightSession] = useState(() => ({
    positions: new Map<string, Point>(),
    id: 0,
  }));
  const previousPage = useRef(`${state.screen}:${state.missionId}`);
  const mission = state.missionId ? missionById.get(state.missionId) : undefined;
  const total = Object.keys(state.save.completed).length;
  const map = () => dispatch({ type: 'navigate', screen: Screen.Map });
  const tutorial = () => dispatch({ type: 'navigate', screen: Screen.Tutorial });
  const summary = () => dispatch({ type: 'navigate', screen: Screen.Summary });

  useEffect(() => {
    function toggleSound(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== 'm' ||
        event.repeat ||
        event.isComposing ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      )
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest(
            'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"]',
          ))
      )
        return;
      event.preventDefault();
      dispatch({ type: 'toggle-sound' });
    }
    window.addEventListener('keydown', toggleSound);
    return () => window.removeEventListener('keydown', toggleSound);
  }, [dispatch]);

  useEffect(() => {
    const page = `${state.screen}:${state.missionId}`;
    if (previousPage.current === page) return;
    previousPage.current = page;
    const flight = mainRef.current?.querySelector<HTMLElement>('.flight-viewport');
    (flight ?? mainRef.current)?.focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [state.screen, state.missionId]);

  function start(id: string) {
    if (!state.save.tutorialDone) tutorial();
    else dispatch({ type: 'start', id });
  }

  const returnToSector = () => dispatch({ type: 'return-sector' });

  return (
    <div
      className={`app-shell ${state.screen === Screen.Map || state.screen === Screen.Sector ? 'exploration-shell' : ''} ${state.save.preferences.largeText ? 'large-text' : ''} ${state.save.preferences.reducedMotion ? 'reduce-motion' : ''}`}
    >
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <aside className="sidebar">
        <a href="#main" className="brand" onClick={map} aria-label="Órbita Matemática, início">
          <span className="brand-symbol">
            <Icon name={IconName.Orbit} size={32} />
          </span>
          <span>
            órbita<span className="brand-subtitle">MATEMÁTICA</span>
          </span>
        </a>
        <div className="sidebar-caption">SUA JORNADA</div>
        <nav aria-label="Navegação principal">
          <button
            className={`nav-item ${state.screen === Screen.Map || state.screen === Screen.Sector || state.screen === Screen.Mission ? 'active' : ''}`}
            aria-current={
              state.screen === Screen.Map ||
              state.screen === Screen.Sector ||
              state.screen === Screen.Mission
                ? 'page'
                : undefined
            }
            onClick={map}
          >
            <Icon name={IconName.Map} />
            Mapa da expedição
          </button>
          <button
            className={`nav-item ${state.screen === Screen.Summary ? 'active' : ''}`}
            aria-current={state.screen === Screen.Summary ? 'page' : undefined}
            onClick={summary}
          >
            <Icon name={IconName.Flag} />
            Minhas descobertas<span className="nav-count">{total}</span>
          </button>
          <button
            className={`nav-item ${state.screen === Screen.Tutorial ? 'active' : ''}`}
            aria-current={state.screen === Screen.Tutorial ? 'page' : undefined}
            onClick={tutorial}
          >
            <Icon name={IconName.Book} />
            Como jogar
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-message">
            <span aria-hidden="true">✧</span>
            <p>
              Aprender é uma jornada.
              <br />
              <strong>O ritmo é seu.</strong>
            </p>
            <div className="tiny-orbit" aria-hidden="true" />
          </div>
          <button className="nav-item" onClick={() => setSettingsOpen(true)}>
            <Icon name={IconName.Settings} />
            Ajustes da expedição
          </button>
          <div className="sidebar-footer">
            <span className="live-dot" /> FEITO PARA TODOS EXPLORAREM
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <span>EXPEDIÇÃO</span>
            <span>/</span>
            <strong>
              {state.screen === Screen.Summary
                ? 'Minhas descobertas'
                : state.screen === Screen.Tutorial
                  ? 'Como jogar'
                  : state.screen === Screen.Mission
                    ? 'Missão em andamento'
                    : state.screen === Screen.Sector
                      ? 'Exploração do setor'
                      : 'Mapa do universo'}
            </strong>
          </div>
          <div className="topbar-right">
            <span className="learning-label">
              <span className="live-dot" /> APRENDER. EXPLORAR. DESCOBRIR.
            </span>
            <span className="explorer-avatar" role="img" aria-label="Explorador">
              <Icon name={IconName.Rocket} size={22} />
            </span>
          </div>
        </header>
        <main id="main" ref={mainRef} tabIndex={-1}>
          {!storageAvailable ? (
            <p className="storage-warning" role="status">
              O navegador não permitiu salvar. Você pode continuar jogando, mas o progresso será
              perdido ao fechar ou recarregar.
            </p>
          ) : null}
          {state.screen === Screen.Map || state.screen === Screen.Sector ? (
            <ExpeditionMap
              key={flightSession.id}
              save={state.save}
              sectorId={state.screen === Screen.Sector ? state.sectorId : null}
              positions={flightSession.positions}
              paused={settingsOpen}
              onSector={(id) => dispatch({ type: 'enter-sector', id })}
              onUniverse={map}
              onStart={start}
              onTutorial={tutorial}
              onSummary={summary}
              onSoundChange={(value) =>
                dispatch({ type: 'preference', key: 'soundEnabled', value })
              }
            />
          ) : null}
          {state.screen === Screen.Tutorial ? (
            <Tutorial
              reducedMotion={state.save.preferences.reducedMotion}
              soundEnabled={state.save.preferences.soundEnabled}
              paused={settingsOpen}
              onBack={map}
              onFinish={() => {
                dispatch({ type: 'tutorial-done' });
              }}
            />
          ) : null}
          {state.screen === Screen.Mission && mission ? (
            <MissionScreen
              key={mission.id}
              mission={mission}
              onBack={returnToSector}
              onComplete={(result) => dispatch({ type: 'complete', result })}
              onNext={returnToSector}
            />
          ) : null}
          {state.screen === Screen.Summary ? <Summary save={state.save} onBack={map} /> : null}
          <footer className="page-footer">
            <span>Um novo jeito de olhar para a matemática.</span>
            <span>
              Sem pressa, a descoberta acontece. <span aria-hidden="true">✦</span>
            </span>
          </footer>
        </main>
      </div>
      {settingsOpen ? (
        <SettingsDialog
          preferences={state.save.preferences}
          onPreference={(key, value) => dispatch({ type: 'preference', key, value })}
          onReset={() => {
            setFlightSession((session) => ({ positions: new Map(), id: session.id + 1 }));
            dispatch({ type: 'reset' });
          }}
          onClose={() => setSettingsOpen(false)}
        />
      ) : null}
    </div>
  );
}
