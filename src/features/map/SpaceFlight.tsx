import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  approach,
  cameraPosition,
  moveShip,
  nearbyDestination,
  type Point,
  type SpaceWorld,
} from '../../game/space';
import { SpaceBody } from './SpaceBody';
import { createThrusterSound } from './thrusterSound';

export interface DestinationStatus {
  unlocked: boolean;
  completed: boolean;
  detail: string;
}
interface SpaceFlightProps {
  world: SpaceWorld;
  statuses: Record<string, DestinationStatus>;
  nextId?: string;
  initialPosition?: Point;
  reducedMotion: boolean;
  soundEnabled: boolean;
  onSoundChange?: (enabled: boolean) => void;
  paused?: boolean;
  onPosition?: (position: Point) => void;
  onVisit: (id: string) => void;
}

const directions: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

export function SpaceFlight({
  world,
  statuses,
  nextId,
  initialPosition,
  reducedMotion,
  soundEnabled,
  onSoundChange,
  paused = false,
  onPosition,
  onVisit,
}: SpaceFlightProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const heading = useRef(0);
  const position = useRef(initialPosition ?? approach(world.destinations[0]));
  const keys = useRef(new Set<string>());
  const [thruster] = useState(createThrusterSound);
  const stopMoving = useCallback(() => {
    keys.current.clear();
    thruster.setMoving(false);
  }, [thruster]);
  useEffect(() => {
    thruster.setEnabled(soundEnabled);
  }, [thruster, soundEnabled]);
  useEffect(() => () => thruster.dispose(), [thruster]);
  const [nearId, setNearId] = useState<string>();
  const [systemReduced, setSystemReduced] = useState(false);
  const helpId = useId();
  const latest = useRef({ onPosition, nextId });
  useEffect(() => {
    latest.current = { onPosition, nextId };
  }, [onPosition, nextId]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastTime = 0;
    let previousNear: string | undefined;
    const stop = stopMoving;
    const tick = (time: number) => {
      const direction = [...keys.current].reduce(
        (sum, key) => {
          const value = directions[key];
          return value ? { x: sum.x + value.x, y: sum.y + value.y } : sum;
        },
        { x: 0, y: 0 },
      );
      const previous = position.current;
      if (!paused && !document.hidden)
        position.current = moveShip(
          position.current,
          direction,
          lastTime ? (time - lastTime) / 1000 : 0,
          world,
        );
      thruster.setMoving(position.current.x !== previous.x || position.current.y !== previous.y);
      lastTime = time;
      const viewport = viewportRef.current;
      if (viewport) {
        // client dimensions and world units stay aligned even with enlarged text.
        const camera = cameraPosition(position.current, world, {
          x: viewport.clientWidth,
          y: viewport.clientHeight,
        });
        if (sceneRef.current)
          sceneRef.current.style.transform = `translate(${-camera.x}px, ${-camera.y}px)`;
        if (direction.x || direction.y)
          heading.current = (Math.atan2(direction.y, direction.x) * 180) / Math.PI + 90;
        if (shipRef.current)
          shipRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) rotate(${heading.current}deg)`;
        markerRef.current?.setAttribute('cx', String(position.current.x));
        markerRef.current?.setAttribute('cy', String(position.current.y));
        const target = world.destinations.find((item) => item.id === latest.current.nextId);
        if (arrowRef.current && target) {
          const angle = Math.atan2(target.y - position.current.y, target.x - position.current.x);
          arrowRef.current.style.transform = `rotate(${angle}rad)`;
        }
        const nearby = nearbyDestination(position.current, world)?.id;
        if (nearby !== previousNear) {
          previousNear = nearby;
          setNearId(nearby);
        }
        latest.current.onPosition?.({ ...position.current });
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', stop);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      stop();
      window.removeEventListener('blur', stop);
      document.removeEventListener('visibilitychange', stop);
    };
  }, [world, paused, thruster, stopMoving]);

  const near = world.destinations.find((item) => item.id === nearId);
  const target = world.destinations.find((item) => item.id === nextId);
  const visit = () => {
    if (near && statuses[near.id]?.unlocked && !paused) {
      stopMoving();
      onVisit(near.id);
    }
  };
  const setTouch = (key: string) => (event: React.PointerEvent<HTMLButtonElement>) => {
    thruster.unlock();
    event.currentTarget.setPointerCapture(event.pointerId);
    keys.current.clear();
    keys.current.add(key);
  };

  return (
    <div className={`flight ${reducedMotion || systemReduced ? 'flight-reduced' : ''}`}>
      <p id={helpId} className="flight-instructions">
        Setas ou WASD para pilotar · Solte para parar · Aproxime-se e pressione Enter para entrar.
        Tab sai da pilotagem.
      </p>
      <div
        ref={viewportRef}
        className="flight-viewport"
        tabIndex={0}
        role="region"
        aria-label="Área de pilotagem"
        aria-describedby={helpId}
        onBlur={stopMoving}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            paused ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
          )
            return;
          const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
          if (directions[key]) {
            event.preventDefault();
            thruster.unlock();
            keys.current.add(key);
          }
          if (key === 'Enter' && !event.repeat) {
            event.preventDefault();
            visit();
          }
        }}
        onKeyUp={(event) => {
          keys.current.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
          if (!keys.current.size) thruster.setMoving(false);
        }}
      >
        <div
          className="flight-scene"
          ref={sceneRef}
          style={{ width: world.width, height: world.height }}
          aria-hidden="true"
        >
          <svg className="flight-route" width={world.width} height={world.height}>
            <polyline points={world.destinations.map((item) => `${item.x},${item.y}`).join(' ')} />
          </svg>
          {world.destinations.map((item, index) => (
            <div
              key={item.id}
              data-destination={item.id}
              className={`space-destination ${statuses[item.id]?.completed ? 'complete' : statuses[item.id]?.unlocked ? 'available' : 'locked'} ${nextId === item.id ? 'next' : ''}`}
              style={{ left: item.x, top: item.y }}
            >
              <SpaceBody kind={item.kind} />
              <span className="destination-number">{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
              <small>
                {statuses[item.id]?.completed
                  ? '✓ Concluída'
                  : statuses[item.id]?.unlocked
                    ? '◇ Disponível'
                    : '▣ Bloqueada'}
              </small>
            </div>
          ))}
          <div className="player-ship" ref={shipRef}>
            <svg viewBox="0 0 40 48">
              <path d="M20 3 36 41 20 33 4 41Z" />
              <path className="ship-flame" d="m15 38 5 8 5-8" />
            </svg>
          </div>
        </div>
        <div className="flight-map" aria-hidden="true">
          <span>RADAR DA EXPEDIÇÃO</span>
          <svg viewBox={`0 0 ${world.width} ${world.height}`}>
            {world.destinations.map((item) => (
              <circle
                key={item.id}
                cx={item.x}
                cy={item.y}
                r="34"
                className={item.id === nextId ? 'radar-next' : ''}
              />
            ))}
            <circle className="radar-ship" ref={markerRef} r="28" />
          </svg>
        </div>
        {onSoundChange ? (
          <button
            type="button"
            className="flight-sound-toggle"
            aria-label="Som da nave"
            aria-pressed={soundEnabled}
            aria-keyshortcuts="m"
            title={soundEnabled ? 'Desligar som (M)' : 'Ligar som (M)'}
            disabled={paused}
            onClick={() => {
              stopMoving();
              onSoundChange(!soundEnabled);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4Z" />
              {soundEnabled ? (
                <>
                  <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m16 9 6 6m0-6-6 6" />
              )}
            </svg>
            {soundEnabled ? 'Som ligado' : 'Som desligado'}
            <kbd>M</kbd>
          </button>
        ) : null}
      </div>
      <div className="flight-hud">
        <div className="flight-contact" role="status">
          {near ? (
            <>
              <strong>{near.label}</strong>
              <span>{statuses[near.id]?.detail}</span>
            </>
          ) : (
            <>
              <strong>Explore o espaço</strong>
              <span>Aproxime-se de um destino destacado.</span>
            </>
          )}
        </div>
        <button
          className="button flight-primary"
          disabled={!near || !statuses[near.id]?.unlocked || paused}
          onClick={visit}
        >
          Entrar
        </button>
      </div>
      {target ? (
        <p className="flight-guidance" role="status">
          <span ref={arrowRef} aria-hidden="true">
            ➜
          </span>{' '}
          Próximo destino: {target.label}
        </p>
      ) : null}
      <div className="flight-touch" aria-label="Controles de pilotagem por toque">
        {[
          ['ArrowUp', '↑', 'Mover para cima'],
          ['ArrowLeft', '←', 'Mover para a esquerda'],
          ['ArrowDown', '↓', 'Mover para baixo'],
          ['ArrowRight', '→', 'Mover para a direita'],
        ].map(([key, symbol, label]) => (
          <button
            key={key}
            aria-label={label}
            disabled={paused}
            onPointerDown={setTouch(key)}
            onPointerUp={stopMoving}
            onPointerCancel={stopMoving}
            onLostPointerCapture={stopMoving}
            onBlur={stopMoving}
            onKeyDown={(event) => {
              if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                thruster.unlock();
                keys.current.add(key);
              }
            }}
            onKeyUp={stopMoving}
          >
            {symbol}
          </button>
        ))}
      </div>
      <details className="flight-destinations" onToggle={stopMoving}>
        <summary>Destinos em lista</summary>
        <p>Você também pode visitar os destinos diretamente pelos botões.</p>
        <ol>
          {world.destinations.map((item) => (
            <li key={item.id}>
              <button
                disabled={!statuses[item.id]?.unlocked || paused}
                onClick={() => {
                  position.current = approach(item);
                  latest.current.onPosition?.({ ...position.current });
                  onVisit(item.id);
                }}
              >
                <span>{item.label}</span>
                <small>{statuses[item.id]?.detail}</small>
              </button>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
