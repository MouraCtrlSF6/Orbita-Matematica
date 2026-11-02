import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import type { SavedGame } from '../../game/types';

interface SummaryProps {
  save: SavedGame;
  onBack: () => void;
}
export function Summary({ save, onBack }: SummaryProps) {
  const count = Object.keys(save.completed).length;
  return (
    <section className="summary-screen">
      <button className="text-button back-link" onClick={onBack}>
        <Icon name={IconName.Back} size={18} />
        Voltar ao mapa
      </button>
      <p className="eyebrow">SEU DIÁRIO DE BORDO</p>
      <h1>{count === missions.length ? 'Um universo de descobertas!' : 'Cada passo conta.'}</h1>
      <p>
        {count === missions.length
          ? 'Você concluiu os três setores. Pode revisitar qualquer missão e continuar experimentando.'
          : 'Aqui ficam suas missões concluídas e os caminhos que ajudaram você a aprender.'}
      </p>
      <div className="summary-total">
        <Icon name={IconName.Star} size={38} />
        <strong>
          {count}
          <span> / {missions.length}</span>
        </strong>
        <p>missões concluídas</p>
      </div>
      <div className="summary-sectors">
        {sectors.map((sector) => (
          <section key={sector.id}>
            <h2>{sector.name}</h2>
            <ul>
              {missions
                .filter((mission) => mission.sectorId === sector.id)
                .map((mission) => {
                  const result = save.completed[mission.id];
                  return (
                    <li key={mission.id}>
                      <Icon name={result ? IconName.Check : IconName.Star} size={19} />
                      <div>
                        <strong>{mission.title}</strong>
                        <span>
                          {result
                            ? `${result.guided ? 'Concluída com solução guiada' : 'Concluída'} · ${result.hints} pistas${result.visual ? ' · objetos utilizados' : ''}`
                            : 'Uma descoberta pela frente'}
                        </span>
                        {result?.creation ? (
                          <p>
                            Seu problema: {result.creation.variable} robôs levam 2{' '}
                            {result.creation.context} cada; a base guarda mais 4. Total:{' '}
                            {2 * result.creation.variable + 4}.
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </div>
      <p className="privacy-note">
        Este diário fica somente neste navegador. Em computadores compartilhados, outra pessoa
        poderá ver ou reiniciar o progresso.
      </p>
    </section>
  );
}
