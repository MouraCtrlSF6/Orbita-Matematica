import { TokenOrder } from './TokenOrder/TokenOrder';
import { TokenValidity } from './TokenValidity/TokenValidity';
import type { useTokenEditor } from '../hooks/useTokenEditor';

interface TokenCanvasProps {
  id: string;
  name: string;
  label: string;
  required: boolean;
  editor: ReturnType<typeof useTokenEditor>;
}

export function TokenCanvas({ id, name, label, required, editor }: TokenCanvasProps) {
  return (
    <>
      <TokenOrder
        id={id}
        tokens={editor.tokens}
        onChange={editor.setTokens}
        onAdd={editor.add}
        label={label}
      />
      <TokenValidity
        name={name}
        label={label}
        value={editor.tokens}
        required={required}
        error={editor.error}
        focusId={id}
      />
    </>
  );
}
