import { AddButton } from '../../../../../../../../../components/AddButton/AddButton';
import { EquivalentOrderList } from './EquivalentOrderList/EquivalentOrderList';
import { useItemIds } from '../../../../hooks/useItemIds';

interface EquivalentOrdersProps {
  tokens: string[];
}

export function EquivalentOrders({ tokens }: EquivalentOrdersProps) {
  const orders = useItemIds();

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span>Outras ordens equivalentes (opcional)</span>
        <AddButton aria-label="Adicionar ordem equivalente" onClick={orders.add} />
      </div>
      <EquivalentOrderList ids={orders.ids} tokens={tokens} onRemove={orders.remove} />
    </div>
  );
}
