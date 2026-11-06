import { EquivalentOrder } from './EquivalentOrder/EquivalentOrder';

interface EquivalentOrderListProps {
  ids: string[];
  tokens: string[];
  onRemove: (id: string) => void;
}

export function EquivalentOrderList({ ids, tokens, onRemove }: EquivalentOrderListProps) {
  return (
    <>
      {ids.map((id, index) => (
        <EquivalentOrder
          key={id}
          tokens={tokens}
          number={index + 1}
          onRemove={() => onRemove(id)}
        />
      ))}
    </>
  );
}
