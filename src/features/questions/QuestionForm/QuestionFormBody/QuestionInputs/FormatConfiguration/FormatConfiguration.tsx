import { ChallengeKind } from '../../../../../../game/types';
import { FormatFields } from './FormatFields/FormatFields';
import { FormatSelector } from './FormatSelector/FormatSelector';

interface FormatConfigurationProps {
  kind: ChallengeKind;
  setKind: (value: ChallengeKind) => void;
}

export function FormatConfiguration({ kind, setKind }: FormatConfigurationProps) {
  return (
    <section className="grid gap-4 border-t border-line pt-4" aria-label="Configuração do formato">
      <h3 className="text-heading m-0">Configuração do formato</h3>
      <FormatSelector kind={kind} setKind={setKind} />
      <FormatFields kind={kind} />
    </section>
  );
}
