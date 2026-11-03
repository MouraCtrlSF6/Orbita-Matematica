import type { ReactNode } from 'react';
import { Icon } from '../components/Icon';
import { IconName } from '../components/icon-names';
import { Screen } from '../game/reducer';
const titles: Record<Screen, string> = {
  [Screen.Map]: 'Mapa do universo',
  [Screen.Sector]: 'Exploração do setor',
  [Screen.Summary]: 'Minhas descobertas',
  [Screen.Tutorial]: 'Como jogar',
  [Screen.Mission]: 'Missão em andamento',
};
function Breadcrumb({ screen }: { screen: Screen }) {
  return (
    <div className="breadcrumb">
      <span>EXPEDIÇÃO</span>
      <span>/</span>
      <strong>{titles[screen]}</strong>
    </div>
  );
}
const topbarRight = (
  <div className="topbar-right">
    <span className="learning-label">
      <span className="live-dot" /> APRENDER. EXPLORAR. DESCOBRIR.
    </span>
    <span className="explorer-avatar" role="img" aria-label="Explorador">
      <Icon name={IconName.Rocket} size={22} />
    </span>
  </div>
);
export function AppWorkspace({ screen, children }: { screen: Screen; children: ReactNode }) {
  return (
    <div className="workspace">
      <header className="topbar">
        <Breadcrumb screen={screen} />
        {topbarRight}
      </header>
      {children}
    </div>
  );
}
export function PageFooter() {
  return (
    <footer className="page-footer">
      <span>Um novo jeito de olhar para a matemática.</span>
      <span>
        Sem pressa, a descoberta acontece. <span aria-hidden="true">✦</span>
      </span>
    </footer>
  );
}
export function StorageWarning({ available }: { available: boolean }) {
  if (available) return null;
  return (
    <p className="storage-warning" role="status">
      O navegador não permitiu salvar. Você pode continuar jogando, mas o progresso será perdido ao
      fechar ou recarregar.
    </p>
  );
}
