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
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SEU DIÁRIO DE BORDO
      </p>
      <h1>{summaryTitle(count)}</h1>
      <p>{summaryDescription(count)}</p>
    </>
  );
}
function SummaryTotal({ count }: { count: number }) {
  return (
    <div className="summary-total flex gap-5 items-center [border:1px_solid_#e2d9ef] [background:#eee8f7] rounded-aside p-[1.5625rem] my-[1.5625rem] mx-0 text-[#705488] [&_strong]:text-summary [&_strong_span]:text-formula [&_strong_span]:text-[#756086] [&_strong_span]:font-normal [&_p]:text-body ds-down-mobile:gap-3.5 ds-down-mobile:flex-wrap ds-down-mobile:[&_p]:text-small">
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
    <div className="summary-sectors grid gap-5 [&_>_section]:p-[1.5625rem] [&_>_section]:[border:1px_solid_var(--line)] [&_>_section]:rounded-panel [&_>_section]:bg-white [&_h2]:text-control [&_ul]:[list-style:none] [&_ul]:p-0 [&_ul]:mt-[0.9375rem] [&_ul]:mr-0 [&_ul]:mb-0 [&_ul]:ml-0 [&_li]:[border-top:1px_solid_#eeedf2] [&_li]:py-[0.9375rem] [&_li]:px-0 [&_li]:flex [&_li]:gap-3 [&_li]:items-start [&_li]:text-[#86729f] [&_strong]:text-support [&_strong]:text-[#51475d] [&_strong]:block [&_li_span]:block [&_li_span]:text-label [&_li_span]:text-[#685b73] [&_li_span]:mt-[0.1875rem] [&_li_p]:text-small [&_li_p]:text-[#5d7163] [&_li_p]:mt-2">
      {sectors.map((sector) => (
        <SectorDiscoveries key={sector.id} sector={sector} save={save} />
      ))}
    </div>
  );
}
const privacy = (
  <p className="privacy-note [.summary-screen_&]:[font-size:0.6875rem]! [.summary-screen_&]:mt-5">
    Este diário fica somente neste navegador. Em computadores compartilhados, outra pessoa poderá
    ver ou reiniciar o progresso.
  </p>
);
function BackToMap({ onBack }: { onBack: () => void }) {
  return (
    <button
      className="text-button back-link inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#6b697d] [border:0] py-2 px-0 ds-hover:underline mb-5.5 [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5"
      onClick={onBack}
    >
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
    <section className="summary-screen [&_>_h1]:mt-2.5 [&_>_h1]:mr-0 [&_>_h1]:mb-[0.9375rem] [&_>_h1]:ml-0 [&_>_p:not(.eyebrow)]:text-muted [&_>_p:not(.eyebrow)]:text-body">
      <BackToMap onBack={onBack} />
      <SummaryHeading count={count} />
      <SummaryProgress count={count} save={save} />
    </section>
  );
}
