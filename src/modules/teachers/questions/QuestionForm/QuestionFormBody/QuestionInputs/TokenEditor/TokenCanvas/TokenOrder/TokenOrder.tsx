import { useTokenOrder } from './hooks/useTokenOrder';
import { OrderActions } from './OrderActions/OrderActions';
import { OrderSlots } from './OrderSlots/OrderSlots';

interface TokenOrderProps {
  id: string;
  tokens: string[];
  label: string;
  onChange: (tokens: string[]) => void;
  onAdd: (token: string) => void;
}

export function TokenOrder({ id, tokens, label, onChange, onAdd }: TokenOrderProps) {
  const order = useTokenOrder(tokens, onChange);

  return (
    <div className="grid gap-2">
      <OrderSlots
        id={id}
        tokens={tokens}
        label={label}
        selected={order.selected}
        onSelect={order.setSelected}
        onAdd={onAdd}
      />
      <OrderActions
        selected={order.selected}
        count={tokens.length}
        move={order.move}
        remove={order.remove}
      />
    </div>
  );
}
