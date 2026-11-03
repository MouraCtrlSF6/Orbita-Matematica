import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import type { Mission, MissionResult, SavedGame, Sector } from '../../game/types';
interface SummaryProps {
  save: SavedGame;
  onBack: () => void;
}
function summaryTitle(count: number): string {
  return count === missions.length ? 'Um universo de descobertas!' : 'Cada passo conta.';
}
function summaryDescription(count: number): string {
  return count === missions.length
    ? 'Você concluiu os três setores. Pode revisitar qualquer missão e continuar experimentando.'
    : 'Aqui ficam suas missões concluídas e os caminhos que ajudaram você a aprender.';
}
function SummaryHeading({ count }: { count: number }) {
  return (
    <>
      <p className="eyebrow">SEU DIÁRIO DE BORDO</p>
      <h1>{summaryTitle(count)}</h1>
      <p>{summaryDescription(count)}</p>
    </>
  );
}
function SummaryTotal({ count }: { count: number }) {
  return (
    <div className="summary-total">
      <Icon name={IconName.Star} size={38} />
      <strong>
        {count}
        <span> / {missions.length}</span>
      </strong>
      <p>missões concluídas</p>
    </div>
  );
}
function resultDescription(result?: MissionResult): string {
  if (!result) return 'Uma descoberta pela frente';
  return `${result.guided ? 'Concluída com solução guiada' : 'Concluída'} · ${result.hints} pistas${result.visual ? ' · objetos utilizados' : ''}`;
}
function AuthoredProblem({ creation }: { creation?: MissionResult['creation'] }) {
  if (!creation) return null;
  return (
    <p>
      Seu problema: {creation.variable} robôs levam 2 {creation.context} cada; a base guarda mais 4.
      Total: {2 * creation.variable + 4}.
    </p>
  );
}
interface DiscoveryProps {
  mission: Mission;
  result?: MissionResult;
}
function DiscoveryDetails({ mission, result }: DiscoveryProps) {
  return (
    <div>
      <strong>{mission.title}</strong>
      <span>{resultDescription(result)}</span>
      <AuthoredProblem creation={result?.creation} />
    </div>
  );
}
function MissionDiscovery(props: DiscoveryProps) {
  return (
    <li>
      <Icon name={props.result ? IconName.Check : IconName.Star} size={19} />
      <DiscoveryDetails {...props} />
    </li>
  );
}
function DiscoveryList({ items, save }: { items: Mission[]; save: SavedGame }) {
  return (
    <ul>
      {items.map((mission) => (
        <MissionDiscovery key={mission.id} mission={mission} result={save.completed[mission.id]} />
      ))}
    </ul>
  );
}
function SectorDiscoveries({ sector, save }: { sector: Sector; save: SavedGame }) {
  const items = missions.filter((item) => item.sectorId === sector.id);
  return (
    <section>
      <h2>{sector.name}</h2>
      <DiscoveryList items={items} save={save} />
    </section>
  );
}
function SummarySectors({ save }: { save: SavedGame }) {
  return (
    <div className="summary-sectors">
      {sectors.map((sector) => (
        <SectorDiscoveries key={sector.id} sector={sector} save={save} />
      ))}
    </div>
  );
}
const privacy = (
  <p className="privacy-note">
    Este diário fica somente neste navegador. Em computadores compartilhados, outra pessoa poderá
    ver ou reiniciar o progresso.
  </p>
);
function BackToMap({ onBack }: { onBack: () => void }) {
  return (
    <button className="text-button back-link" onClick={onBack}>
      <Icon name={IconName.Back} size={18} />
      Voltar ao mapa
    </button>
  );
}
function SummaryProgress({ count, save }: { count: number; save: SavedGame }) {
  return (
    <>
      <SummaryTotal count={count} />
      <SummarySectors save={save} />
      {privacy}
    </>
  );
}
export function Summary({ save, onBack }: SummaryProps) {
  const count = Object.keys(save.completed).length;
  return (
    <section className="summary-screen">
      <BackToMap onBack={onBack} />
      <SummaryHeading count={count} />
      <SummaryProgress count={count} save={save} />
    </section>
  );
}
