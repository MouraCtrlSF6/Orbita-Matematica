import { PieceEntry } from './PieceEntry/PieceEntry';
import { PieceList } from './PieceList/PieceList';
import { useAvailablePieces } from './hooks/useAvailablePieces';

interface AvailablePiecesProps {
  tokens: string[];
  onChange: (tokens: string[]) => void;
}

export function AvailablePieces({ tokens, onChange }: AvailablePiecesProps) {
  const { add, remove } = useAvailablePieces(tokens, onChange);

  return (
    <div className="grid gap-3">
      <PieceEntry count={tokens.length} onAdd={add} />
      <input type="hidden" name="tokens" value={tokens.join('|')} />
      <PieceList tokens={tokens} onRemove={remove} />
    </div>
  );
}
