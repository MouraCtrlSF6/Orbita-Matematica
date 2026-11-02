import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import { isMissionUnlocked, isSectorUnlocked, nextMission } from '../../game/progress';
import type { SavedGame } from '../../game/types';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { Planet, SpaceArt } from '../../components/SpaceArt';

interface ExpeditionMapProps {
  save: SavedGame;
  onStart: (id: string) => void;
  onTutorial: () => void;
  onSummary: () => void;
}

export function ExpeditionMap({ save, onStart, onTutorial, onSummary }: ExpeditionMapProps) {
  const total = Object.keys(save.completed).length;
  const next = missions.find((mission) => mission.id === nextMission(save)) ?? missions[0];
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">CADA DESCOBERTA COMEÇA COM VOCÊ</p>
          <h1>
            O universo espera por você<span className="purple-text">.</span>
          </h1>
          <p>Explore, experimente e descubra a matemática no seu ritmo.</p>
        </div>
        <div className="grade-tag">
          <Icon name={IconName.Book} size={17} /> Matemática · 8º ano
        </div>
      </section>

      <section className="expedition-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="pill">
            <span className="live-dot" />{' '}
            {total === missions.length
              ? 'EXPEDIÇÃO CONCLUÍDA · CONTINUE DESCOBRINDO'
              : total
                ? 'SUA EXPEDIÇÃO CONTINUA'
                : 'SUA EXPEDIÇÃO ESTÁ SÓ COMEÇANDO'}
          </span>
          <h2 id="hero-title">
            Pequenos passos.
            <br />
            Grandes <em>descobertas.</em>
          </h2>
          <p>
            Uma aventura pelo espaço, onde cada desafio
            <br className="desktop-break" /> revela um novo jeito de entender a álgebra.
          </p>
          <button
            className="button primary peach-button"
            onClick={() => (save.tutorialDone ? onStart(next.id) : onTutorial())}
          >
            <Icon name={IconName.Rocket} size={20} />
            {total === missions.length
              ? 'Explorar novamente'
              : total
                ? 'Continuar expedição'
                : 'Vamos explorar'}
            <Icon name={IconName.Arrow} size={18} />
          </button>
          <span className="hero-note">Sem pressa. Sem perder vidas. Com você a cada passo.</span>
        </div>
        <SpaceArt />
        <span className="hero-coordinate" aria-hidden="true">
          ÁLGEBRA · COORDENADA 08.06
        </span>
      </section>

      <section aria-labelledby="sectors-title" className="sectors-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SEU MAPA DE DESCOBERTAS</span>
            <h2 id="sectors-title">Uma missão de cada vez</h2>
          </div>
          <span className="section-meta">
            {sectors.length} setores <span>·</span> {missions.length} missões
          </span>
        </div>
        <div className="sector-grid">
          {sectors.map((sector) => {
            const sectorMissions = missions.filter((mission) => mission.sectorId === sector.id);
            const count = sectorMissions.filter((mission) => save.completed[mission.id]).length;
            const unlocked = isSectorUnlocked(sector.id, save.completed);
            const target =
              sectorMissions.find((mission) => !save.completed[mission.id]) ?? sectorMissions[0];
            return (
              <article
                key={sector.id}
                className={`sector-card ${sector.color} ${unlocked ? '' : 'locked'}`}
              >
                <div className="sector-card-top">
                  <span className="sector-number">SETOR {sector.number}</span>
                  <span className={`sector-status ${unlocked ? 'available' : ''}`}>
                    <Icon
                      name={
                        count === sectorMissions.length
                          ? IconName.Check
                          : unlocked
                            ? IconName.Star
                            : IconName.Lock
                      }
                      size={13}
                    />
                    {count === sectorMissions.length
                      ? 'Concluído'
                      : unlocked
                        ? 'Disponível'
                        : 'Bloqueado'}
                  </span>
                </div>
                <Planet variant={sector.planet} />
                <p className="sector-subtitle">{sector.subtitle}</p>
                <h3>{sector.name}</h3>
                <p className="sector-description">{sector.description}</p>
                <div className="sector-progress">
                  <span>
                    {count} de {sectorMissions.length} missões
                  </span>
                  <span>{Math.round((count / sectorMissions.length) * 100)}%</span>
                </div>
                <progress
                  value={count}
                  max={sectorMissions.length}
                  aria-label={`Progresso de ${sector.name}`}
                />
                <button
                  className="sector-open"
                  disabled={!unlocked}
                  onClick={() => onStart(target.id)}
                >
                  {count === sectorMissions.length
                    ? 'Revisitar setor'
                    : unlocked
                      ? 'Explorar setor'
                      : 'Conclua o setor anterior'}
                  <Icon name={unlocked ? IconName.Arrow : IconName.Lock} size={18} />
                </button>
                {unlocked && count > 0 ? (
                  <details className="mission-list">
                    <summary>Escolher missão</summary>
                    {sectorMissions.map((mission, index) => (
                      <button
                        key={mission.id}
                        disabled={!isMissionUnlocked(mission.id, save.completed)}
                        onClick={() => onStart(mission.id)}
                      >
                        {save.completed[mission.id] ? '✓' : '○'} {index + 1}. {mission.title}
                      </button>
                    ))}
                  </details>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <div className="map-bottom">
        <section className="support-banner">
          <div className="support-symbol">
            <Icon name={IconName.Bulb} size={26} />
          </div>
          <div>
            <h3>Todo explorador pode pedir uma pista.</h3>
            <p>Ouça os enunciados, veja exemplos e avance do seu jeito.</p>
          </div>
          <button className="text-button" onClick={onTutorial}>
            Como jogar <Icon name={IconName.Arrow} size={17} />
          </button>
        </section>
        <button className="discovery-card" onClick={onSummary}>
          <span className="discovery-star">
            <Icon name={IconName.Star} size={25} />
          </span>
          <span>
            <strong>
              {total} <small>/ {missions.length}</small>
            </strong>
            <span>descobertas na bagagem</span>
          </span>
          <Icon name={IconName.Arrow} size={18} />
        </button>
      </div>
    </>
  );
}
