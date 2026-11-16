import { TokenPalette } from './TokenPalette/TokenPalette';
import { NumberPiece } from './NumberPiece/NumberPiece';

interface TokenComposerProps {
  available?: string[];
  onAdd: (token: string) => void;
}

export function TokenComposer({ available, onAdd }: TokenComposerProps) {
  return (
    <>
      <p className="text-small text-muted m-0">
        {available
          ? 'Ordene as peças corretas para a montagem da expressão. Arraste ou toque em uma peça para adicionar.'
          : 'Monte uma expressão para acompanhar o enunciado. A correção usa a resposta definida acima.'}
      </p>
      {!available && <NumberPiece onAdd={onAdd} />}
      <TokenPalette tokens={available ?? ['x', '+', '−', '×', '÷', '(', ')']} onAdd={onAdd} />
    </>
  );
}
