import { useNumberPiece } from './hooks/useNumberPiece';
import { Input } from '../../../../../../../../components/Input/Input';
import { AddButton } from '../../../../../../../../components/AddButton/AddButton';

interface NumberPieceProps {
  onAdd: (token: string) => void;
}

export function NumberPiece({ onAdd }: NumberPieceProps) {
  const field = useNumberPiece(onAdd);

  return (
    <div className="flex flex-wrap items-end gap-2">
      <label className="grid gap-1 text-small">
        Número
        <Input className="w-28" value={field.value} onChange={field.change} inputMode="numeric" />
      </label>
      <AddButton
        aria-label="Adicionar número à expressão"
        disabled={field.disabled}
        onClick={field.add}
      />
    </div>
  );
}
