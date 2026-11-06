import { SelectedPiece } from './SelectedPiece/SelectedPiece';

interface OrderSlotsProps {
  id: string;
  label: string;
  tokens: string[];
  selected: number;
  onSelect: (index: number) => void;
  onAdd: (token: string) => void;
}

export function OrderSlots({ id, label, tokens, selected, onSelect, onAdd }: OrderSlotsProps) {
  return (
    <div
      id={id}
      tabIndex={-1}
      role="group"
      aria-label={label}
      aria-describedby={id + '-error'}
      onDragOver={allowDrop}
      onDrop={(event) => {
        event.preventDefault();
        onAdd(event.dataTransfer.getData('text/plain'));
      }}
      className="flex flex-wrap gap-2 min-h-16 rounded-control border border-dashed border-selected-border p-3"
    >
      {tokens.map((token, index) => (
        <SelectedPiece
          key={index}
          token={token}
          index={index}
          selected={selected === index}
          onSelect={onSelect}
        />
      ))}
      <span hidden={tokens.length > 0} className="text-muted text-small">
        Adicione ou arraste as peças aqui.
      </span>
    </div>
  );
}

function allowDrop(event: React.DragEvent) {
  event.preventDefault();
}
