import { usePieceEntry } from './hooks/usePieceEntry';
import { Input } from '../../../../../../../../../../components/Input/Input';
import { AddButton } from '../../../../../../../../../../components/AddButton/AddButton';
import { FieldLabel } from '../../../../../FieldLabel/FieldLabel';

interface PieceEntryProps {
  count: number;
  onAdd: (token: string) => void;
}

export function PieceEntry({ count, onAdd }: PieceEntryProps) {
  const field = usePieceEntry(onAdd, count);

  return (
    <div className="flex items-end gap-2">
      <label className="grid gap-1 font-semibold min-w-0 flex-1">
        <FieldLabel label="Peças disponíveis" />
        <Input
          aria-label="Peças disponíveis"
          value={field.value}
          onChange={field.change}
          placeholder="Número, x, operação ou parêntese"
        />
      </label>
      <AddButton aria-label="Adicionar componente" disabled={field.disabled} onClick={field.add} />
    </div>
  );
}
