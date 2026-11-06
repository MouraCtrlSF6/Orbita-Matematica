import { ObjectModel } from '../../../../../../../../mission/ObjectModel/ObjectModel';

export function CreationExample() {
  return (
    <div className="border border-line rounded-card p-4">
      <p className="font-bold text-primary">Exemplo com x = 3: 2 × 3 + 4 = 10</p>
      <ObjectModel model={{ groups: 2, perGroup: 3, extra: 4, label: 'cristais' }} />
      <p className="text-small text-muted">Dois grupos de três objetos e quatro extras.</p>
    </div>
  );
}
